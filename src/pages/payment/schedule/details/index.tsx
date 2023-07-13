import PageDialog from "@/components/page-dialog";
import { Box } from "@mantine/core";
import TablePaymentScheduleDetails from "./components/table";
import ApproveUploadModal from "./components/upload-modal";
import usePagination from "@/hooks/usePagination";
import {
  useActionPaymentScheduleDetails,
  useDataPaymentScheduleDetails,
  useModalPaymentScheduleDetails,
} from "./hooks";
import PostponeModal from "./components/postpone-modal";
import ReminderModal from "./components/reminder-modal";
import AddBankUserModal from "./components/add-user-bank";

interface IProps {
  visible: boolean;
  id: number;
  handleHide: () => void;
}

const DetailsPaymentSchedule = (props: IProps) => {
  const { visible, id, handleHide } = props;
  const { page, limit } = usePagination({});
  const {
    query: { data, isLoading, isRefetching },
    setStatus,
  } = useDataPaymentScheduleDetails({ id, page, limit });
  const {
    showUpload,
    setShowUpload,
    showPostpone,
    setShowPostpone,
    showReminder,
    setShowReminder,
    showAddBank,
    handleCloseAddBank,
    handleShowAddBank,
  } = useModalPaymentScheduleDetails();
  const { setSelectedId } = useActionPaymentScheduleDetails();
  return (
    <PageDialog
      show={visible}
      onCancel={handleHide}
      title={`${data?.data?.name || ""} Payment Schedule Details`}
      type="view"
    >
      <Box w="100%" mih="60vh">
        <TablePaymentScheduleDetails
          setStatus={setStatus}
          data={data}
          loading={isLoading || isRefetching}
          setSelectedId={setSelectedId}
          handleUpload={() => setShowUpload(true)}
          handlePostpone={() => setShowPostpone(true)}
          handleReminder={() => setShowReminder(true)}
        />
      </Box>
      <ApproveUploadModal
        opened={showUpload}
        onClose={() => setShowUpload(false)}
        contactId={+data?.data?.contact_id || 0}
        handleAddBank={handleShowAddBank}
      />
      <PostponeModal
        opened={showPostpone}
        onClose={() => setShowPostpone(false)}
        idPaymentSchedule={id}
      />
      <ReminderModal
        opened={showReminder}
        onClose={() => setShowReminder(false)}
      />
      <AddBankUserModal
        opened={showAddBank}
        onClose={handleCloseAddBank}
        contactId={+data?.data?.contact_id || 0}
      />
    </PageDialog>
  );
};

export default DetailsPaymentSchedule;
