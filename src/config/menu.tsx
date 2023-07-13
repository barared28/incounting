import { IBreadcrumb, TKeyGroupRouter, TKeySubRouter } from "@/types";
import {
  IconArrowsTransferUp,
  IconBaguette,
  IconBath,
  IconBed,
  IconBedFilled,
  IconBook2,
  IconBrandCashapp,
  IconBuilding,
  IconBuildingBank,
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconBusinessplan,
  IconCalendarEvent,
  IconCalendarStats,
  IconCalendarUp,
  IconCar,
  IconCash,
  IconCategory2,
  IconChartAreaLine,
  IconChartBar,
  IconChartPie2,
  IconCheckupList,
  IconCheese,
  IconChefHat,
  IconClock,
  IconCoffee,
  IconCreditCard,
  IconDatabase,
  IconDetails,
  IconDiscount2,
  IconEmergencyBed,
  IconFileInvoice,
  IconHistory,
  IconHome,
  IconHome2,
  IconHomeShield,
  IconList,
  IconListDetails,
  IconLockAccess,
  IconLockCog,
  IconPackage,
  IconPaperBag,
  IconPigMoney,
  IconPremiumRights,
  IconReceiptTax,
  IconReport,
  IconReportAnalytics,
  IconReportMoney,
  IconSalad,
  IconScale,
  IconSettings,
  IconShoppingBag,
  IconShoppingCartDiscount,
  IconTruckDelivery,
  IconUser,
  IconUserCog,
  IconUsers,
  IconUsersGroup,
  IconWallet,
} from "@tabler/icons-react";

export interface IMenusSubs {
  name: string;
  key: TKeySubRouter | string;
  main?: boolean;
  Icon?: JSX.Element;
  path: string;
  breadcrumb?: IBreadcrumb;
  development?: boolean;
  actions?: {
    label: string;
    value: string;
  }[];
}
export interface IMenuParent {
  name: string;
  key: TKeyGroupRouter | string;
  Icon: JSX.Element;
  subs: IMenusSubs[];
  breadcrumb?: IBreadcrumb;
}
export interface IMenusMain {
  name: string;
  key: string;
  menus: IMenuParent[];
  breadcrumb?: IBreadcrumb;
}

const CREATE = {
  value: "create",
  label: "Create",
};

const UPDATE = {
  value: "update",
  label: "Update",
};

const DELETE = {
  value: "delete",
  label: "Delete",
};

const Menus: IMenusMain[] = [
  {
    name: "Main",
    key: "main",
    breadcrumb: {
      label: "Main",
      type: "no-action",
    },
    menus: [
      {
        name: "Dashboard",
        key: "dashboard",
        Icon: <IconHome />,
        subs: [
          {
            name: "Dashboard",
            key: "main_dashboard",
            Icon: <IconHome size={18} />,
            main: true,
            path: "/dashboard",
            breadcrumb: {
              label: "Dashboard",
              path: "/dashboard",
            },
            development: true,
          },
        ],
      },
    ],
  },
  {
    name: "Master",
    key: "master",
    breadcrumb: {
      label: "Master",
      type: "no-action",
    },
    menus: [
      {
        name: "Property",
        key: "property",
        Icon: <IconBuildingSkyscraper />,
        breadcrumb: {
          label: "Property",
          type: "no-action",
        },
        subs: [
          {
            name: "Property",
            key: "property",
            main: false,
            Icon: <IconBuildingSkyscraper size={18} />,
            path: "/property",
            actions: [CREATE, UPDATE, DELETE],
          },
          {
            name: "Type",
            key: "property_type",
            main: false,
            Icon: <IconBuilding size={18} />,
            path: "/property-type",
            breadcrumb: {
              label: "Type",
              path: "/property-type",
            },
            actions: [CREATE, UPDATE, DELETE],
          },
        ],
      },
      {
        name: "Payment",
        key: "payment",
        Icon: <IconCalendarStats />,
        breadcrumb: {
          label: "Payment",
          type: "no-action",
        },
        subs: [
          {
            name: "Schedule",
            key: "property_schedule",
            main: false,
            path: "/payment",
            Icon: <IconCalendarStats size={18} />,
            breadcrumb: {
              label: "Schedule",
              path: "/payment",
            },
            actions: [CREATE, UPDATE, DELETE],
          },
        ],
      },
      {
        name: "Account List",
        key: "account_list",
        Icon: <IconList />,
        breadcrumb: {
          label: "Account List",
          type: "no-action",
        },
        subs: [
          {
            name: "Account",
            key: "account_list",
            main: false,
            path: "/account/list",
            Icon: <IconList size={18} />,
            breadcrumb: {
              label: "Account List",
              path: "/account/list",
            },
            development: true,
          },
          {
            name: "Clasification Account",
            key: "account_clasification",
            main: false,
            path: "/account/category",
            Icon: <IconUsers size={18} />,
            breadcrumb: {
              label: "Clasification Account",
              path: "/account/category",
            },
            development: true,
          },
          {
            name: "Account Mapping",
            key: "account_mapping",
            main: false,
            path: "/account/mapping",
            Icon: <IconListDetails size={18} />,
            breadcrumb: {
              label: "Account Mapping",
              path: "/account/mapping",
            },
            development: true,
          },
        ],
      },
      {
        name: "Cash & Bank",
        key: "cash_bank",
        Icon: <IconBuildingBank />,
        breadcrumb: {
          label: "Cash & Bank",
          type: "no-action",
        },
        subs: [
          {
            name: "Bank",
            key: "bank",
            main: false,
            path: "/account/bank",
            Icon: <IconBuildingBank size={18} />,
            breadcrumb: {
              label: "Bank",
              path: "/account/bank",
            },
            development: true,
          },
          {
            name: "Cash",
            key: "cash",
            main: false,
            path: "/account/cash",
            Icon: <IconCash size={18} />,
            breadcrumb: {
              label: "Cash",
              path: "/account/cash",
            },
            development: true,
          },
        ],
      },
      {
        name: "Product",
        key: "product",
        Icon: <IconShoppingBag />,
        breadcrumb: {
          label: "Product",
          type: "no-action",
        },
        subs: [
          {
            name: "Product Category",
            key: "product_category",
            main: false,
            path: "/master/product_category",
            Icon: <IconCategory2 size={18} />,
            breadcrumb: {
              label: "Product Category",
              path: "/master/product_category",
            },
            development: true,
          },
          {
            name: "Product",
            key: "product",
            main: false,
            path: "/master/product",
            Icon: <IconCheese size={18} />,
            breadcrumb: {
              label: "Product",
              path: "/master/product",
            },
            development: true,
          },
        ],
      },
      {
        name: "Data Store",
        key: "data_store",
        Icon: <IconDatabase />,
        breadcrumb: {
          label: "Data Store",
          type: "no-action",
        },
        subs: [
          {
            name: "Contact",
            key: "contact",
            main: false,
            path: "/master/contact",
            Icon: <IconUser size={18} />,
            breadcrumb: {
              label: "Contact",
              path: "/master/contact",
            },
          },
          {
            name: "Booking Source",
            key: "booking_source",
            main: false,
            path: "/master/travel_agent",
            Icon: <IconCar size={18} />,
            breadcrumb: {
              label: "Booking Source",
              path: "/master/travel_agent",
            },
          },
          {
            name: "Department",
            key: "department",
            main: false,
            path: "/master/division",
            Icon: <IconBuildingCommunity size={18} />,
            breadcrumb: {
              label: "Department",
              path: "/master/division",
            },
          },
          // {
          //   name: "Department Role",
          //   key: "department_role",
          //   main: false,
          //   path: "/master/division_work_rule",
          //   Icon: <IconHomeCog size={18} />,
          //   breadcrumb: {
          //     label: "Department Role",
          //     path: "/master/division_work_rule",
          //   },
          //   development: true,
          // },
          {
            name: "Payment Term",
            key: "payment_term",
            main: false,
            path: "/master/payment_term",
            Icon: <IconBrandCashapp size={18} />,
            breadcrumb: {
              label: "Payment Term",
              path: "/master/payment_term",
            },
            development: true,
          },
          {
            name: "Unit Measurement",
            key: "unit_measurement",
            main: false,
            path: "/master/unit_measurement",
            Icon: <IconDatabase size={18} />,
            breadcrumb: {
              label: "Unit Measurement",
              path: "/master/unit_measurement",
            },
            development: true,
          },
          {
            name: "Tax",
            key: "tax",
            main: false,
            path: "/master/tax",
            Icon: <IconReceiptTax size={18} />,
            breadcrumb: {
              label: "Tax",
              path: "/master/tax",
            },
            development: true,
          },
        ],
      },
      {
        name: "Room",
        key: "room",
        Icon: <IconBed />,
        breadcrumb: {
          label: "Room",
          type: "no-action",
        },
        subs: [
          {
            name: "Type",
            key: "room_type",
            main: false,
            path: "/room/type",
            Icon: <IconBed size={18} />,
            breadcrumb: {
              label: "Type",
              path: "/room/type",
            },
            development: true,
          },
          {
            name: "Pod & Room",
            key: "pod_room",
            main: false,
            path: "/room/podroom",
            Icon: <IconBath size={18} />,
            breadcrumb: {
              label: "Pod & Room",
              path: "/room/podroom",
            },
            development: true,
          },
        ],
      },
      {
        name: "Food & Beverage",
        key: "food_beverage",
        Icon: <IconCoffee />,
        breadcrumb: {
          label: "Food & Beverage",
          type: "no-action",
        },
        subs: [
          {
            name: "Item",
            key: "item",
            main: false,
            path: "/food_beverage/item",
            Icon: <IconCoffee size={18} />,
            breadcrumb: {
              label: "Item",
              path: "/food_beverage/item",
            },
            development: true,
          },
          {
            name: "Item Group",
            key: "group",
            main: false,
            path: "/food_beverage/group",
            Icon: <IconPaperBag size={18} />,
            breadcrumb: {
              label: "Item Group",
              path: "/food_beverage/group",
            },
            development: true,
          },
          {
            name: "Order",
            key: "order",
            main: false,
            path: "/transaction/transaction_platform?department=is_food_beverage",
            Icon: <IconChefHat size={18} />,
            breadcrumb: {
              label: "Order",
              path: "/transaction/transaction_platform?department=is_food_beverage",
            },
            development: true,
          },
        ],
      },
      {
        name: "Human Resource",
        key: "hr",
        Icon: <IconUsersGroup />,
        breadcrumb: {
          label: "Human Resource",
          type: "no-action",
        },
        subs: [
          {
            name: "Attendance",
            key: "attendance",
            main: false,
            path: "/hr/attendance",
            Icon: <IconCalendarStats size={18} />,
            breadcrumb: {
              label: "Attendance",
              path: "/hr/attendance",
            },
          },
          {
            name: "Shift Schedule",
            key: "shift_schedules",
            main: false,
            path: "/hr/shift-schedules",
            Icon: <IconClock size={18} />,
            breadcrumb: {
              label: "Shift Schedule",
              path: "/hr/shift-schedules",
            },
          },
          {
            name: "Work Schedule",
            key: "work_schedules",
            main: false,
            path: "/hr/work-schedules",
            Icon: <IconCalendarEvent size={18} />,
            breadcrumb: {
              label: "Work Schedule",
              path: "/hr/work-schedules",
            },
          },
          {
            name: "Salary",
            key: "salary",
            main: false,
            path: "/hr/sallary",
            Icon: <IconCreditCard size={18} />,
            breadcrumb: {
              label: "Salary",
              path: "/hr/sallary",
            },
            development: true,
          },
          {
            name: "Payroll",
            key: "payroll",
            main: false,
            path: "/hr/payroll",
            Icon: <IconPigMoney size={18} />,
            breadcrumb: {
              label: "Payroll",
              path: "/hr/payroll",
            },
            development: true,
          },
          {
            name: "Overtime",
            key: "overtime",
            main: false,
            path: "/hr/overtime",
            Icon: <IconCalendarUp size={18} />,
            breadcrumb: {
              label: "Overtime",
              path: "/hr/overtime",
            },
            development: true,
          },
        ],
      },
      {
        name: "Voucher",
        key: "voucher",
        Icon: <IconDiscount2 />,
        breadcrumb: {
          label: "Voucher",
          type: "no-action",
        },
        subs: [
          {
            name: "Voucher",
            key: "voucher",
            main: true,
            path: "/voucher",
            Icon: <IconDiscount2 size={18} />,
            breadcrumb: {
              label: "Voucher",
              path: "/voucher",
            },
            development: true,
          },
        ],
      },
      {
        name: "Inventory",
        key: "inventory",
        Icon: <IconPackage />,
        breadcrumb: {
          label: "Inventory",
          type: "no-action",
        },
        subs: [
          {
            name: "Product",
            key: "product_inventory",
            main: false,
            path: "/inventory/product-inventory",
            Icon: <IconBaguette size={18} />,
            breadcrumb: {
              label: "Product",
              path: "/inventory/product-inventory",
            },
            development: true,
          },
          {
            name: "Transaction",
            key: "transaction",
            main: false,
            path: "/inventory/transaction",
            Icon: <IconWallet size={18} />,
            breadcrumb: {
              label: "Transaction",
              path: "/inventory/transaction",
            },
            development: true,
          },
          {
            name: "Detail",
            key: "detail",
            main: false,
            path: "/inventory/detail",
            Icon: <IconDetails size={18} />,
            breadcrumb: {
              label: "Detail",
              path: "/inventory/detail",
            },
            development: true,
          },
          {
            name: "Recipe",
            key: "recipe",
            main: false,
            path: "/inventory/recipe",
            Icon: <IconSalad size={18} />,
            breadcrumb: {
              label: "Recipe",
              path: "/inventory/recipe",
            },
            development: true,
          },
        ],
      },
      {
        name: "Budget Plan",
        key: "budget_plan",
        Icon: <IconBusinessplan />,
        breadcrumb: {
          label: "Budget Plan",
          type: "no-action",
        },
        subs: [
          {
            name: "Budget Plan",
            key: "budget_plan",
            main: true,
            path: "/planning/budget",
            Icon: <IconBusinessplan size={18} />,
            breadcrumb: {
              label: "Budget Plan",
              path: "/planning/budget",
            },
            development: true,
          },
        ],
      },
      {
        name: "Room Used",
        key: "room_used",
        Icon: <IconBedFilled />,
        breadcrumb: {
          label: "Room Used",
          type: "no-action",
        },
        subs: [
          {
            name: "Out Of Order",
            key: "out_of_order",
            main: false,
            path: "/room_used/out_of_order",
            Icon: <IconEmergencyBed size={18} />,
            breadcrumb: {
              label: "Out Of Order",
              path: "/room_used/out_of_order",
            },
            development: true,
          },
          {
            name: "House Use",
            key: "house_use",
            main: false,
            path: "/room_used/house_use",
            Icon: <IconHome2 size={18} />,
            breadcrumb: {
              label: "House Use",
              path: "/room_used/house_use",
            },
            development: true,
          },
          {
            name: "Block Room",
            key: "block_room",
            main: false,
            path: "/room_used/block_room",
            Icon: <IconHomeShield size={18} />,
            breadcrumb: {
              label: "Block Room",
              path: "/room_used/block_room",
            },
            development: true,
          },
        ],
      },
    ],
  },
  {
    name: "Accounting",
    key: "accounting",
    breadcrumb: {
      label: "Accounting",
      type: "no-action",
    },
    menus: [
      {
        name: "Sales",
        key: "sales",
        Icon: <IconReportMoney />,
        breadcrumb: {
          label: "Sales",
          type: "no-action",
        },
        subs: [
          {
            name: "Sales Order",
            key: "sales_order",
            main: false,
            path: "/sales_v1/sales_order",
            Icon: <IconReport size={18} />,
            breadcrumb: {
              label: "Sales Order",
              path: "/sales_v1/sales_order",
            },
            development: true,
          },
          {
            name: "Invoice Sales",
            key: "invoice_sales",
            main: false,
            path: "/sales_v1/invoice_order",
            Icon: <IconReportMoney size={18} />,
            breadcrumb: {
              label: "Invoice Sales",
              path: "/sales_v1/invoice_order",
            },
            development: true,
          },
          {
            name: "Sales Payment",
            key: "sales_payment",
            main: false,
            path: "/sales_v1/income_order",
            Icon: <IconCheckupList size={18} />,
            breadcrumb: {
              label: "Sales Payment",
              path: "/sales_v1/income_order",
            },
            development: true,
          },
          {
            name: "History Sales",
            key: "history_sales",
            main: false,
            path: "/sales_v1/history_sales",
            Icon: <IconChartPie2 size={18} />,
            breadcrumb: {
              label: "History Sales",
              path: "/sales_v1/history_sales",
            },
            development: true,
          },
        ],
      },
      {
        name: "Purchasing",
        key: "purchasing",
        Icon: <IconTruckDelivery />,
        breadcrumb: {
          label: "Purchasing",
          type: "no-action",
        },
        subs: [
          {
            name: "Purchase Request",
            key: "purchase_request",
            main: false,
            path: "/purchasing/purchase_request",
            Icon: <IconCreditCard size={18} />,
            breadcrumb: {
              label: "Purchase Request",
              path: "/purchasing/purchase_request",
            },
            development: true,
          },
          {
            name: "Purchase Order",
            key: "purchase_order",
            main: false,
            path: "/purchasing/purchase_order",
            Icon: <IconShoppingCartDiscount size={18} />,
            breadcrumb: {
              label: "Purchase Order",
              path: "/purchasing/purchase_order",
            },
            development: true,
          },
          {
            name: "Purchase Delivery",
            key: "purchase_delivery",
            main: false,
            path: "/purchasing/purchase_delivery",
            Icon: <IconTruckDelivery size={18} />,
            breadcrumb: {
              label: "Purchase Delivery",
              path: "/purchasing/purchase_delivery",
            },
            development: true,
          },
          {
            name: "Purchase Invoice",
            key: "purchase_invoice",
            main: false,
            path: "/purchasing/receipt",
            Icon: <IconFileInvoice size={18} />,
            breadcrumb: {
              label: "Purchase Invoice",
              path: "/purchasing/receipt",
            },
            development: true,
          },
          {
            name: "Purchase Payment",
            key: "purchase_payment",
            main: false,
            path: "/purchasing/spending",
            Icon: <IconCash size={18} />,
            breadcrumb: {
              label: "Purchase Payment",
              path: "/purchasing/spending",
            },
            development: true,
          },
          {
            name: "History",
            key: "history",
            main: false,
            path: "/purchasing/history_purchasing",
            Icon: <IconHistory size={18} />,
            breadcrumb: {
              label: "History",
              path: "/purchasing/history_purchasing",
            },
            development: true,
          },
        ],
      },
      {
        name: "Journal Report",
        key: "journal_report",
        Icon: <IconReportAnalytics />,
        breadcrumb: {
          label: "Journal Report",
          type: "no-action",
        },
        subs: [
          {
            name: "Journal Report",
            key: "journal_report",
            main: true,
            path: "/transaction/journal_report",
            Icon: <IconReportAnalytics size={18} />,
            breadcrumb: {
              label: "Journal Report",
              path: "/transaction/journal_report",
            },
            development: true,
          },
        ],
      },
      {
        name: "Transaction",
        key: "transaction",
        Icon: <IconArrowsTransferUp />,
        breadcrumb: {
          label: "Transaction",
          type: "no-action",
        },
        subs: [
          {
            name: "Transaction",
            key: "transaction",
            main: true,
            path: "/transaction/transaction_platform",
            Icon: <IconArrowsTransferUp size={18} />,
            breadcrumb: {
              label: "Transaction",
              path: "/transaction/transaction_platform",
            },
            development: true,
          },
        ],
      },
    ],
  },
  {
    name: "Report",
    key: "report",
    breadcrumb: {
      label: "Report",
      type: "no-action",
    },
    menus: [
      {
        name: "Trial Balance",
        key: "trial_balance",
        Icon: <IconPremiumRights />,
        breadcrumb: {
          label: "Trial Balance",
          type: "no-action",
        },
        subs: [
          {
            name: "Trial Balance",
            key: "trial_balance",
            main: true,
            path: "/report/trial_balance",
            Icon: <IconPremiumRights size={18} />,
            breadcrumb: {
              label: "Trial Balance",
              path: "/report/trial_balance",
            },
            development: true,
          },
        ],
      },
      {
        name: "Ledger",
        key: "ledger",
        Icon: <IconBook2 />,
        breadcrumb: {
          label: "Ledger",
          type: "no-action",
        },
        subs: [
          {
            name: "Ledger",
            key: "ledger",
            main: true,
            path: "/report/ledger",
            Icon: <IconPremiumRights size={18} />,
            breadcrumb: {
              label: "Ledger",
              path: "/report/ledger",
            },
            development: true,
          },
        ],
      },
      {
        name: "Balance Sheet",
        key: "balance_sheet",
        Icon: <IconScale />,
        breadcrumb: {
          label: "Balance Sheet",
          type: "no-action",
        },
        subs: [
          {
            name: "Balance Sheet",
            key: "balance_sheet",
            main: true,
            path: "/report/neraca",
            Icon: <IconScale size={18} />,
            breadcrumb: {
              label: "Balance Sheet",
              path: "/report/neraca",
            },
            development: true,
          },
        ],
      },
      {
        name: "Profit & Loss",
        key: "profit_loss",
        Icon: <IconChartAreaLine />,
        breadcrumb: {
          label: "Profit & Loss",
          type: "no-action",
        },
        subs: [
          {
            name: "Profit & Loss",
            key: "profit_loss",
            main: true,
            path: "/report/profit_loss",

            Icon: <IconChartAreaLine size={18} />,
            breadcrumb: {
              label: "Profit & Loss",
              path: "/report/profit_loss",
            },
            development: true,
          },
        ],
      },
      {
        name: "Daily Sales Report",
        key: "daily_sales",
        Icon: <IconChartBar />,
        breadcrumb: {
          label: "Daily Sales Report",
          type: "no-action",
        },
        subs: [
          {
            name: "Daily Sales Report",
            key: "daily_sales",
            main: true,
            path: "/report/daily_sales",
            Icon: <IconChartBar size={18} />,
            breadcrumb: {
              label: "Daily Sales Report",
              path: "/report/daily_sales",
            },
          },
        ],
      },
    ],
  },
  {
    name: "System",
    key: "system",
    breadcrumb: {
      label: "System",
      type: "no-action",
    },
    menus: [
      {
        name: "User Management",
        key: "user_management",
        Icon: <IconUserCog />,
        breadcrumb: {
          label: "User Management",
          type: "no-action",
        },
        subs: [
          {
            name: "User",
            key: "user",
            main: false,
            path: "/system/user",
            Icon: <IconLockCog size={18} />,
            breadcrumb: {
              label: "User",
              path: "/system/user",
            },
            development: true,
          },
          {
            name: "Role",
            key: "role",
            main: false,
            path: "/system/role",
            Icon: <IconLockAccess size={18} />,
            breadcrumb: {
              label: "Role",
              path: "/system/role",
            },
          },
        ],
      },
      {
        name: "Setting",
        key: "setting",
        Icon: <IconSettings />,
        breadcrumb: {
          label: "Setting",
          type: "no-action",
        },
        subs: [
          {
            name: "Setting",
            key: "setting",
            main: true,
            path: "/setting/company",
            Icon: <IconSettings size={18} />,
            breadcrumb: {
              label: "Setting",
              path: "/setting/company",
            },
          },
        ],
      },
    ],
  },
];

export default Menus;
