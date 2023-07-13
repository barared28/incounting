import { lazy } from "react";
import withLayout from "@/hoc/layout";
import { TKeySubRouter } from "@/types";

// PAGES COMPONENT SHOULD WRAPE WITH LAYOUT HOC & LAZY LOAD
const Dashboard = withLayout(
  lazy(() => import("@/pages/dashboard")),
  "Dashboard"
);
const Property = withLayout(
  lazy(() => import("@/pages/property/property")),
  "Property"
);
const PropertyType = withLayout(
  lazy(() => import("@/pages/property/type")),
  "Property Type"
);
const PaymentSchedule = withLayout(
  lazy(() => import("@/pages/payment/schedule")),
  "Payment Schedule"
);
const Development = withLayout(lazy(() => import("@/pages/under-development")));
const Contact = withLayout(lazy(() => import("@/pages/data-store/contact")));
const SelectBusiness = lazy(() => import("@/pages/business"));
const Department = withLayout(
  lazy(() => import("@/pages/data-store/department")),
  "Department"
);
const BookingSource = withLayout(
  lazy(() => import("@/pages/data-store/booking-source")),
  "Booking Source"
);
const ReportDailySales = withLayout(
  lazy(() => import("@/pages/daily-sales-report")),
  "Daily Sales Report"
);
const Role = withLayout(
  lazy(() => import("@/pages/user-management/role")),
  "Role"
);
const Setting = withLayout(
  lazy(() => import("@/pages/setting")),
  "Setting"
);
const Verify = lazy(() => import("@/pages/verify"));
const Attendance = withLayout(
  lazy(() => import("@/pages/human-resources/attendance")),
  "Attendance"
);
const ShiftSchedules = withLayout(
  lazy(() => import("@/pages/human-resources/shift-schedules")),
  "Shift Schedules"
);
const WorkSchedules = withLayout(
  lazy(() => import("@/pages/human-resources/work-schedules")),
  "Work Schedules"
);

export interface IRouterMain {
  path: string;
  Element: any;
  key: TKeySubRouter | string;
}

const Router: IRouterMain[] = [
  {
    path: "dashboard",
    Element: Development,
    key: "main_dashboard",
  },
  {
    path: "property",
    Element: Property,
    key: "main_dashboard",
  },
  {
    path: "property-type",
    Element: PropertyType,
    key: "main_dashboard",
  },
  {
    path: "payment",
    Element: PaymentSchedule,
    key: "main_dashboard",
  },
  {
    path: "select-business",
    Element: SelectBusiness,
    key: "main_dashboard",
  },
  {
    path: "development",
    Element: Development,
    key: "development",
  },
  {
    path: "master/contact",
    Element: Contact,
    key: "contact",
  },
  {
    path: "master/division",
    Element: Department,
    key: "department",
  },
  {
    path: "/master/travel_agent",
    Element: BookingSource,
    key: "booking_source",
  },
  {
    path: "/report/daily_sales",
    Element: ReportDailySales,
    key: "daily_sales_report",
  },
  {
    path: "/system/role",
    Element: Role,
    key: "role",
  },
  {
    path: "/setting/company",
    Element: Setting,
    key: "setting",
  },
  {
    path: "/verify",
    Element: Verify,
    key: "verify",
  },
  {
    path: "hr/attendance",
    Element: Attendance,
    key: "attendance",
  },
  {
    path: "hr/shift-schedules",
    Element: ShiftSchedules,
    key: "shift_schedules",
  },
  {
    path: "hr/work-schedules",
    Element: WorkSchedules,
    key: "work_schedules",
  },
];

export default Router;
