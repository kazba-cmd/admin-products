import { Button, Stack } from '@material-ui/core';
import { Icon } from '@iconify/react';
import fileExcelOutlined from '@iconify/icons-ant-design/file-excel-filled';
import React from 'react';

export default function ExcelButton() {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Button variant="contained">
        Экспорт в Excel
        <Stack ml={1}>
          <Icon icon={fileExcelOutlined} width={20} height={20} />
        </Stack>
      </Button>
    </Stack>
  );
}
