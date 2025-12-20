[Console]::OutputEncoding = [System.Text.Encoding]::UTF8;

Get-Printer | 
    Select -ExpandProperty Name | 
    ConvertTo-Json -Compress