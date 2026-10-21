<?php
declare(strict_types=1);

const FORM_RECIPIENT = 'info@tmtsolutions.de';
const FORM_SENDER = 'info@tmtsolutions.de';
const MAX_REQUEST_BYTES = 6 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const MAX_ATTACHMENT_COUNT = 3;

function respond(int $status, string $message): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Method not allowed.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength <= 0 || $contentLength > MAX_REQUEST_BYTES) {
    respond(413, 'Request size is invalid.');
}

if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, 'Thank you. Your message has been sent.');
}

$name = trim((string) ($_POST['name'] ?? ''));
$company = trim((string) ($_POST['company'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$topic = trim((string) ($_POST['topic'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$length = static fn (string $value): int => function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
$allowedTopics = [
    'praesentation' => 'Präsentationstermin Business Central',
    'einfuehrung' => 'Einführung und Beratung',
    'anpassungen' => 'Anpassungen und Erweiterungen',
    'support' => 'Support',
    'karriere' => 'Bewerbung / Lebenslauf',
];

if ($name === '' || $length($name) > 120 || $length($company) > 160 || $length($phone) > 40
    || $length($message) < 2 || $length($message) > 5000
    || !filter_var($email, FILTER_VALIDATE_EMAIL) || $length($email) > 254
    || !isset($allowedTopics[$topic])
    || preg_match('/[\r\n]/', $name . $company . $phone . $email)) {
    respond(422, 'Please check the required fields and inquiry topic.');
}

$allowedTypes = [
    'pdf' => ['application/pdf'],
    'doc' => ['application/msword', 'application/x-ole-storage'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'xls' => ['application/vnd.ms-excel', 'application/x-ole-storage'],
    'xlsx' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    'ppt' => ['application/vnd.ms-powerpoint', 'application/x-ole-storage'],
    'pptx' => ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    'csv' => ['text/plain', 'text/csv', 'application/csv', 'application/vnd.ms-excel'],
    'png' => ['image/png'],
    'jpg' => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
];
$attachments = [];
$totalAttachmentBytes = 0;
$uploadedFiles = $_FILES['attachments'] ?? null;

if ($uploadedFiles !== null) {
    if (!is_array($uploadedFiles) || !isset($uploadedFiles['name'], $uploadedFiles['tmp_name'], $uploadedFiles['error'], $uploadedFiles['size'])
        || !is_array($uploadedFiles['name']) || !is_array($uploadedFiles['tmp_name'])
        || !is_array($uploadedFiles['error']) || !is_array($uploadedFiles['size'])) {
        respond(422, 'Invalid attachment data.');
    }

    if (count($uploadedFiles['name']) > MAX_ATTACHMENT_COUNT) {
        respond(422, 'Up to 3 attachments are allowed.');
    }

    if (!class_exists('finfo')) {
        error_log('TMT contact form: PHP fileinfo extension is required for attachment validation.');
        respond(500, 'Attachment validation is unavailable.');
    }
    $fileInfo = new finfo(FILEINFO_MIME_TYPE);

    foreach ($uploadedFiles['name'] as $index => $originalName) {
        $uploadError = $uploadedFiles['error'][$index] ?? UPLOAD_ERR_NO_FILE;
        if ($uploadError === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($uploadError !== UPLOAD_ERR_OK) {
            respond($uploadError === UPLOAD_ERR_INI_SIZE || $uploadError === UPLOAD_ERR_FORM_SIZE ? 413 : 422, 'An attachment could not be uploaded.');
        }

        $temporaryPath = (string) ($uploadedFiles['tmp_name'][$index] ?? '');
        if ($temporaryPath === '' || !is_uploaded_file($temporaryPath)) {
            respond(422, 'Invalid attachment upload.');
        }

        $actualSize = filesize($temporaryPath);
        if ($actualSize === false || $actualSize <= 0) {
            respond(422, 'Attachments must not be empty.');
        }
        $totalAttachmentBytes += $actualSize;
        if ($totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
            respond(413, 'Attachments exceed the 5 MB total size limit.');
        }

        $extension = strtolower(pathinfo((string) $originalName, PATHINFO_EXTENSION));
        $mimeType = $fileInfo->file($temporaryPath);
        $isValidOfficeContainer = false;
        if ($mimeType === 'application/zip' && in_array($extension, ['docx', 'xlsx', 'pptx'], true)) {
            if (!class_exists('ZipArchive')) {
                error_log('TMT contact form: PHP zip extension is required to validate OOXML attachments.');
                respond(500, 'Attachment validation is unavailable.');
            }
            $expectedOfficeEntries = [
                'docx' => 'word/document.xml',
                'xlsx' => 'xl/workbook.xml',
                'pptx' => 'ppt/presentation.xml',
            ];
            $officeArchive = new ZipArchive();
            if ($officeArchive->open($temporaryPath) === true) {
                $isValidOfficeContainer = $officeArchive->locateName($expectedOfficeEntries[$extension]) !== false;
                $officeArchive->close();
            }
            if ($isValidOfficeContainer) {
                $mimeType = $allowedTypes[$extension][0];
            }
        }
        if (!isset($allowedTypes[$extension]) || !is_string($mimeType)
            || (!in_array($mimeType, $allowedTypes[$extension], true) && !$isValidOfficeContainer)) {
            respond(422, 'Only approved business document and image formats are accepted.');
        }

        $contents = file_get_contents($temporaryPath);
        if ($contents === false) {
            respond(422, 'An attachment could not be read.');
        }

        $safeName = preg_replace('/[^A-Za-z0-9._-]+/', '_', basename((string) $originalName));
        $safeName = trim((string) $safeName, '._');
        if ($safeName === '') {
            $safeName = 'attachment.' . $extension;
        }
        $attachments[] = [
            'name' => $safeName,
            'mime' => $mimeType,
            'contents' => $contents,
        ];
    }
}

$textBody = implode("\n", [
    'Name: ' . $name,
    'Company: ' . $company,
    'Email: ' . $email,
    'Phone: ' . $phone,
    'Topic: ' . $allowedTopics[$topic],
    '',
    $message,
]);
$boundary = 'tmt-' . bin2hex(random_bytes(18));
$bodyParts = [
    '--' . $boundary,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    chunk_split(base64_encode($textBody)),
];

foreach ($attachments as $attachment) {
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . '"';
    $bodyParts[] = 'Content-Transfer-Encoding: base64';
    $bodyParts[] = 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"';
    $bodyParts[] = '';
    $bodyParts[] = chunk_split(base64_encode($attachment['contents']));
}
$bodyParts[] = '--' . $boundary . '--';
$body = implode("\r\n", $bodyParts);
$headers = [
    'From' => FORM_SENDER,
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'multipart/mixed; boundary="' . $boundary . '"',
];
$headerLines = [];
foreach ($headers as $key => $value) {
    $headerLines[] = $key . ': ' . $value;
}

if (!mail(FORM_RECIPIENT, 'Website inquiry: ' . $allowedTopics[$topic], $body, implode("\r\n", $headerLines))) {
    error_log('TMT contact form: mail() failed.');
    respond(500, 'Message could not be sent.');
}

respond(200, 'Message sent.');
