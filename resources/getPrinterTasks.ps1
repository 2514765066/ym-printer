param(
  [Parameter(Mandatory = $true)]
  [string]$PrinterName
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Get-PrintJob -PrinterName $PrinterName |
  Select-Object `
    ID,
    DocumentName,
    @{ Name = 'JobStatus'; Expression = { $_.JobStatus.ToString() } } |
  ConvertTo-Json -Compress
