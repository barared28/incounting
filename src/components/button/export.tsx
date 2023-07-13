import { Button, Divider, Menu } from "@mantine/core";
import {
  IconFileExport,
  IconFileSpreadsheet,
  IconPdf,
} from "@tabler/icons-react";

const ExportButton = () => {
  return (
    <Menu withinPortal width={150}>
      <Menu.Target>
        <Button leftIcon={<IconFileExport />} variant="outline">
          Export File
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconFileSpreadsheet size={20} />}>Excel</Menu.Item>
        <Divider />
        <Menu.Item icon={<IconPdf size={20} />}>PDF</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ExportButton;
