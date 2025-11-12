[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8


$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

while ($true) {
    $line = [Console]::ReadLine()

    if ($line -eq "exit") { break }

    $params = $line | ConvertFrom-Json

    $md5 = $params.md5
    $inputPath = $params.inputPath
    $outputPath = $params.outputPath

    try {
        # 打开文档（只读，不添加到最近文件，不确认格式）
        $doc = $word.Documents.Open($inputPath, [ref]$false, [ref]$true, [ref]$false)
        
        # 导出为 PDF（17 表示 PDF 格式）
        $doc.ExportAsFixedFormat($outputPath, 17)

        # 关闭文档
        $doc.Close($false)

        Write-Output $md5
    }
    catch {
        Write-Output $inputPath
    }
}

$word.Quit()
