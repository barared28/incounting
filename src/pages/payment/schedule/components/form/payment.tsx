import PercentageInput from "@/components/input/percent";
import RupiahInput from "@/components/input/rupiah";
import { formatIDR } from "@/utils/currency";
import { getNextDate } from "@/utils/date";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  NumberInput,
  Paper,
  Select,
  Table,
  Text,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { IDownPayment, useCustomPaymentForm } from "./hooks";
import { MonthPickerInput } from "@mantine/dates";

interface IProps {
  form: UseFormReturnType<any>;
  downPayment: IDownPayment[];
  setDownPayment: any;
}

const optionsDate = Array.from({ length: 28 }, (_, index) => index + 1);

const selectOptionsDate = optionsDate.map((option) => ({
  value: String(option),
  label: String(option),
}));

const PaymentFormSection = (props: IProps) => {
  const { form, downPayment, setDownPayment } = props;
  const theme = useMantineTheme();
  const {
    paymentDate,
    handleEditDownPayment,
    handleDeleteDownPayment,
    handleAddDownPayment,
    totalDownPaymentPercentage,
    totalDownPaymentAmount,
    total,
    totalInstallment,
    installment,
    month,
    calculateNextPaymentDate,
    calculatePaymentAmount,
    calculateRemainingAmount,
  } = useCustomPaymentForm({ form, downPayment, setDownPayment });

  return (
    <Paper p="xl" w="100%" radius="sm">
      {/* ======== section payment start ========== */}
      <Flex direction="column" gap="sm" maw={rem("620px")}>
        <Text weight={500}>Payment Details</Text>
        <RupiahInput
          label="Booking Fee"
          withAsterisk
          {...form.getInputProps("fee")}
        />
        <RupiahInput
          label="Grand Total"
          description="Total payment for property and fee"
          disabled
          {...form.getInputProps("total")}
        />
        <Flex gap="sm">
          <MonthPickerInput
            label="Start Payment"
            description="Process payment start"
            withAsterisk
            w="100%"
            {...form.getInputProps("month")}
          />
          <Select
            label="Payment Date"
            withAsterisk
            description="Due date payment"
            data={selectOptionsDate}
            w="100%"
            {...form.getInputProps("date")}
          />
        </Flex>
      </Flex>
      {/* ======== section payment end ========== */}
      <Divider variant="dashed" my={40} />
      {/* ======== section down payment start ========== */}
      <Text size={14} weight={500}>
        Down Payment
        <span style={{ color: theme.colors.red[6] }}> *</span>
      </Text>
      <Text color={theme.colors.dark[2]} size={12} mb={16}>
        Clients can make down payments more than once
      </Text>
      <Table verticalSpacing="md">
        <thead>
          <tr style={{ backgroundColor: theme.colors.gray[3] }}>
            <th>No</th>
            <th>Payment Date</th>
            <th>Percentage (%)</th>
            <th>Amount (Rp)</th>
            <th>Outstanding(Rp)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {downPayment.map((val: any, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                {paymentDate ? getNextDate(paymentDate, index, month) : "-"}
              </td>
              <td>
                <PercentageInput
                  maw={140}
                  min={0}
                  max={100}
                  value={val?.percentage}
                  onChange={(value) =>
                    handleEditDownPayment(index, "percentage", value)
                  }
                />
              </td>
              <td>
                <RupiahInput
                  maw={180}
                  min={0}
                  value={val?.amount}
                  onChange={(value) =>
                    handleEditDownPayment(index, "amount", value)
                  }
                />
              </td>
              <td>{formatIDR(val?.rest)}</td>
              <td>
                <Tooltip label="Delete Down Payment">
                  <ActionIcon onClick={() => handleDeleteDownPayment(index)}>
                    <IconTrash color={theme.colors.red[6]} />
                  </ActionIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={6}>
              <Center>
                <Button
                  size="sm"
                  onClick={handleAddDownPayment}
                  leftIcon={<IconPlus size={16} />}
                >
                  Add Down Payment
                </Button>
              </Center>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Text align="center" weight={500}>
                TOTAL DOWN PAYMENT
              </Text>
            </td>
            <td>
              <PercentageInput
                disabled
                maw={140}
                value={totalDownPaymentPercentage}
                error={
                  totalDownPaymentPercentage > 100
                    ? "Total down payment percentage cannot be more than 100%"
                    : ""
                }
              />
            </td>
            <td>
              <RupiahInput
                disabled
                maw={180}
                hideControls
                value={totalDownPaymentAmount}
                error={
                  totalDownPaymentAmount > total
                    ? "Total down payment amount cannot be more than total"
                    : ""
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      {/* ======== section down payment end ========== */}
      <Divider variant="dashed" my={40} />
      {/* ======== section installment start ========== */}
      <Flex direction="column" gap="sm" maw={rem("620px")}>
        <RupiahInput
          disabled
          label="Outstanding"
          description="Total balance of down payment"
          value={totalInstallment}
          error={
            totalInstallment < 0
              ? "Total installment cannot be less than 0"
              : ""
          }
        />
        <Box maw={rem("310px")}>
          <NumberInput
            label="Installment"
            description="Installment period"
            withAsterisk
            hideControls
            rightSection={
              <Center w="100%" h="100%">
                <Text size="sm">Month</Text>
              </Center>
            }
            rightSectionWidth={64}
            {...form.getInputProps("installment")}
          />
        </Box>
      </Flex>
      {installment > 0 ? (
        <>
          <Divider variant="dashed" my={40} />
          <Text size={14} weight={500} mb={16}>
            Installment Calculating Details
          </Text>
          <Table verticalSpacing="md">
            <thead>
              <tr style={{ backgroundColor: theme.colors.gray[3] }}>
                <th>No</th>
                <th>Payment Date</th>
                <th>Amount (Rp)</th>
                <th>Outstanding (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: installment }, (_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {calculateNextPaymentDate(
                      paymentDate,
                      downPayment?.length,
                      index
                    )}
                  </td>
                  <td>
                    {formatIDR(
                      calculatePaymentAmount(
                        index,
                        installment,
                        totalInstallment
                      )
                    )}
                  </td>
                  <td>
                    {formatIDR(
                      calculateRemainingAmount(
                        index,
                        installment,
                        totalInstallment
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Divider variant="dashed" my={40} />
        </>
      ) : null}
      {/* ======== section installment end ========== */}
    </Paper>
  );
};

export default PaymentFormSection;
