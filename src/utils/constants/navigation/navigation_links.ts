import {
  LuArrowDownCircle,
  LuArrowRightLeft,
  LuArrowUpCircle,
  LuArrowUpDown,
  LuBadgeAlert,
  LuBarChart3,
  LuBarChart4,
  LuBoxes,
  LuClipboardSignature,
  LuCommand,
  LuContact2,
  LuDatabase,
  LuFileClock,
  LuFilePieChart,
  LuFileSpreadsheet,
  LuGanttChartSquare,
  LuGitFork,
  LuLayoutGrid,
  LuListChecks,
  LuListOrdered,
  LuMapPin,
  LuOrbit,
  LuPackage,
  LuPackageOpen,
  LuPiggyBank,
  LuPlusCircle,
  LuPrinter,
  LuQrCode,
  LuRepeat,
  LuScale,
  LuScrollText,
  LuSettings,
  LuSettings2,
  LuShapes,
  LuShieldCheck,
  LuSlack,
  LuSnowflake,
  LuSplit,
  LuSunSnow,
  LuTags,
  LuUsers,
} from "react-icons/lu";

export interface INavigationLinks {
  icon?: React.ElementType;
  label: {
    bn: string;
    en: string;
  };
  key: string;
  href: string;
  sublinks?: INavigationLinks[];
}

// USER MANAGEMENT LINKS
export const user_management_links_admin = {
  icon: LuUsers,
  label: { bn: "ব্যবহারকারী অ্যাকাউন্ট ব্যবস্থাপনা", en: "User Management" },
  key: "user_management",
  href: "user_management",
  sublinks: [
    {
      icon: LuListOrdered,
      label: { bn: "সদস্য তালিকা", en: "User List" },
      key: "users_list",
      href: "users_list",
    },
    {
      icon: LuGitFork,
      label: { bn: "শাখা তালিকা", en: "Branch List" },
      key: "branch_list",
      href: "branch_list",
    },
  ],
};
export const user_management_links_others = {
  icon: LuUsers,
  label: { bn: "ব্যবহারকারী অ্যাকাউন্ট ব্যবস্থাপনা", en: "User Management" },
  key: "user_management",
  href: "user_management",
  sublinks: [
    {
      icon: LuListOrdered,
      label: { bn: "সদস্য তালিকা", en: "User List" },
      key: "users_list",
      href: "users_list",
    },
  ],
};

// CONTACTS LINKS
const contacts_links = {
  icon: LuContact2,
  label: { bn: "যোগাযোগ", en: "Contacts" },
  key: "contacts",
  href: "contacts",
  sublinks: [
    // customer

    {
      icon: LuListOrdered,
      label: { bn: "গ্রাহক তালিকা", en: "Customer List" },
      key: "customers_list",
      href: "customers_list",
    },
    // supplier
    {
      icon: LuListOrdered,
      label: { bn: "সরবরাহকারী তালিকা", en: "Supplier List" },
      key: "supplier_list",
      href: "supplier_list",
    },
  ],
};

// PRODUCT MANAGEMENT LINKS
const product_management_links = {
  icon: LuBoxes,
  label: { bn: "পণ্য ব্যবস্থাপনা", en: "Product Management" },
  key: "product_management",
  href: "product_management",
  sublinks: [
    // PRODUCT
    {
      icon: LuPackageOpen,
      label: { bn: "পণ্য", en: "Product List" },
      key: "products_list",
      href: "products_list",
    },
    // BRAND
    {
      icon: LuTags,
      label: { bn: "ব্র্যান্ড", en: "Brand List" },
      key: "brand_list",
      href: "brand_list",
    },
    // CATEGORY
    {
      icon: LuLayoutGrid,
      label: { bn: "বিভাগ", en: "Category List" },
      key: "category_list",
      href: "category_list",
    },
    // SUB-CATEGORY
    {
      icon: LuShapes,
      label: { bn: "উপশ্রেণী", en: "Sub-category List" },
      key: "sub_category_list",
      href: "sub_category_list",
    },
    // UNIT
    {
      icon: LuOrbit,
      label: { bn: "ইউনিট", en: "Unit List" },
      key: "unit_list",
      href: "unit_list",
    },
    // VARIATION
    {
      icon: LuSlack,
      label: { bn: "ফিল্টার", en: "Variation List" },
      key: "variation_list",
      href: "variation_list",
    },
    // WARRANTY TYPES
    {
      icon: LuShieldCheck,
      label: { bn: "ওয়ারেন্টি", en: "Warranty Types" },
      key: "warranty_list",
      href: "warranty_list",
    },
    // PRINT LABELS
    {
      icon: LuPrinter,
      label: { bn: "প্রিন্ট লেবেল", en: "Print Labels" },
      key: "print_labels",
      href: "print_labels",
    },
  ],
};

// PRODUCT PURCHASE LINKS
const product_purchase_links = {
  icon: LuArrowDownCircle,
  label: { bn: "পণ্য ক্রয়", en: "Product Purchase" },
  key: "product_purchase",
  href: "product_purchase",
  sublinks: [
    // PURCHASE LIST
    {
      icon: LuListChecks,
      label: { bn: "ক্রয় পণ্য তালিকা", en: "Purchase List" },
      key: "purchase_list",
      href: "purchase_list",
    },
    // RETURN PURCHASE LIST
    {
      icon: LuListOrdered,
      label: { bn: "ক্রয় ফেরত তালিকা", en: "Return Purchase List" },
      key: "return_purchase_list",
      href: "return_purchase_list",
    },
  ],
};

// SELL LINKS
const product_sell_links = {
  icon: LuArrowUpCircle,
  label: { bn: "পণ্য বিক্রয়", en: "Product Sells" },
  key: "product_sell",
  href: "product_sell",
  sublinks: [
    {
      icon: LuListOrdered,
      label: { bn: "পণ্য বিক্রয় তালিকা", en: "Pos List" },
      key: "pos_list",
      href: "pos_list",
    },
    {
      icon: LuListOrdered,
      label: { bn: "বিক্রয় ফেরত তালিকা", en: "Return & Exchange List" },
      key: "sell_return_list",
      href: "sell_return_list",
    },
  ],
};

// EXPENSE LINKS
const expense_links = {
  icon: LuSplit,
  label: { bn: "ব্যয়", en: "Expense" },
  key: "expense",
  href: "expense",
  sublinks: [
    // expense
    {
      icon: LuListOrdered,
      label: { bn: "ব্যয় তালিকা", en: "Expense List" },
      key: "expenses_list",
      href: "expenses_list",
    },
    // expense category
    {
      icon: LuSnowflake,
      label: { bn: "ব্যয় বিভাগ", en: "Expense Category" },
      key: "expense_category",
      href: "expense_category",
    },
    // sub expense category
    {
      icon: LuSunSnow,
      label: { bn: "উপ-ব্যয় বিভাগ", en: "Expense Sub-category" },
      key: "expense_sub_category",
      href: "expense_sub_category",
    },
  ],
};
// PAYMENT ACCOUNT LINKS
const payment_account_links = {
  icon: LuPiggyBank,
  label: { bn: "পেমেন্ট অ্যাকাউন্ট", en: "Payment Accounts" },
  key: "payment_accounts",
  href: "payment_accounts",
  sublinks: [
    // ACCOUNT LIST
    {
      icon: LuListOrdered,
      label: { bn: "অ্যাকাউন্ট তালিকা", en: "Account List" },
      key: "account_list",
      href: "account_list",
    },
    // INVEST LIST
    {
      icon: LuListOrdered,
      label: { bn: "বিনিয়োগ তালিকা", en: "Invest List" },
      key: "invest_list",
      href: "invest_list",
    },
    // INVESTING LIST
    {
      icon: LuListOrdered,
      label: { bn: "ইনভেস্টিং তালিকা", en: "Investing List" },
      key: "investing_list",
      href: "investing_list",
    },
    // BALANCE SHEET
    {
      icon: LuFileSpreadsheet,
      label: { bn: "ব্যালেন্স শিট", en: "Balance Sheet" },
      key: "balance_sheet",
      href: "balance_sheet",
    },
    // TRAIL BALANCE
    {
      icon: LuScale,
      label: { bn: "ট্রায়াল ব্যালেন্স", en: "Trail Balance" },
      key: "trail_balance",
      href: "trail_balance",
    },
    // CASH FLOW
    {
      icon: LuRepeat,
      label: { bn: "ক্যাশ ফ্লো", en: "Cash Flow" },
      key: "cash_flow",
      href: "cash_flow",
    },
  ],
};
// DETAILS REPORTS LINKS
const details_report_links = {
  icon: LuBadgeAlert,
  label: { bn: "বিস্তারিত রিপোর্ট", en: "Detail Reports" },
  key: "detail_reports",
  href: "detail_reports",
  sublinks: [
    // Profit/Loss Reports
    {
      icon: LuArrowUpDown,
      label: { bn: "লাভ/ক্ষতির রিপোর্ট", en: "Profit/Loss Reports" },
      key: "profit_loss_reports",
      href: "profit_loss_reports",
    },
    // Stock Report
    {
      icon: LuBarChart4,
      label: { bn: "স্টক রিপোর্ট", en: "Stock Report" },
      key: "stock_reports",
      href: "stock_reports",
    },
    // Items Report
    {
      icon: LuClipboardSignature,
      label: { bn: "আইটেম রিপোর্ট", en: "Day-book" },
      key: "day_book_report",
      href: "day_book_report",
    },
  ],
};

// SETTING LINKS
const settings_links = {
  icon: LuSettings,
  label: { bn: "সেটিংস", en: "Settings" },
  key: "settings",
  href: "settings",
  sublinks: [
    // business settings
    {
      icon: LuSettings2,
      label: { bn: "ব্যবসার সেটিংস", en: "Business Settings" },
      key: "business_settings",
      href: "business_settings",
    },
    // business Locations
    {
      icon: LuMapPin,
      label: { bn: "ব্যবসার অবস্থান", en: "Business Locations" },
      key: "business_locations",
      href: "business_locations",
    },
    // invoice settings
    {
      icon: LuGanttChartSquare,
      label: { bn: "চালান সেটিংস", en: "Invoice Settings" },
      key: "invoice_settings",
      href: "invoice_settings",
    },
    // barcode settings
    {
      icon: LuQrCode,
      label: { bn: "বারকোড সেটিংস", en: "Barcode Settings" },
      key: "barcode_settings",
      href: "barcode_settings",
    },
    // Receipt Printers
    {
      icon: LuPrinter,
      label: { bn: "রসিদ প্রিন্টার", en: "Receipt Printers" },
      key: "receipt_printers",
      href: "receipt_printers",
    },
    // package subscription
    {
      icon: LuPackage,
      label: { bn: "প্যাকেজ সাবস্ক্রিপশন", en: "Package Subscription" },
      key: "package_subscription",
      href: "package_subscription",
    },
  ],
};

// DUE REPORTS LINKS
const due_reports_links = {
  icon: LuFileClock,
  label: { bn: "বকেয়া রিপোর্ট", en: "Due Reports" },
  key: "due_report",
  href: "due_report",
  sublinks: [
    {
      icon: LuScrollText,
      label: { bn: "বকেয়া সংগ্রহ", en: "Due Collection" },
      key: "due_collection",
      href: "due_collection",
    },
    {
      icon: LuListOrdered,
      label: { bn: "বকেয়া সংগ্রহ তালিকা", en: "Due Collection List" },
      key: "due_collection_list",
      href: "due_collection_list",
    },
  ],
};

// PAYMENT REPORTS LINKS
const payment_reports_links = {
  icon: LuBarChart3,
  label: { bn: "পেমেন্ট রিপোর্ট", en: "Payment Reports" },
  key: "payment_report",
  href: "payment_report",
  sublinks: [
    {
      icon: LuPlusCircle,
      label: { bn: "পেমেন্ট রিপোর্ট নিবন্ধন", en: "Add Payment Report" },
      key: "add_payment_report",
      href: "add_payment_report",
    },
    {
      icon: LuListOrdered,
      label: { bn: "পেমেন্ট রিপোর্ট তালিকা", en: "Payment Report List" },
      key: "payment_report_list",
      href: "payment_report_list",
    },
  ],
};
// STOCK TRANSFER LINKS
const stock_transfer_links = {
  icon: LuArrowRightLeft,
  label: { bn: "স্টক ট্রান্সফার", en: "Stock Transfer" },
  key: "stock_transfer",
  href: "stock_transfer",
  sublinks: [
    {
      icon: LuPlusCircle,
      label: { bn: "স্টক ট্রান্সফার নিবন্ধন", en: "Add Stock Transfer" },
      key: "add_stock_transfer",
      href: "add_stock_transfer",
    },
    {
      icon: LuListOrdered,
      label: { bn: "স্টক ট্রান্সফার তালিকা", en: "Stock Transfer List" },
      key: "stock_transfer_list",
      href: "stock_transfer_list",
    },
  ],
};
// STOCK ADJUSTMENT LINKS
const stock_adjustment_links = {
  icon: LuDatabase,
  label: { bn: "স্টক সহযোজন", en: "Stock Adjustment" },
  key: "stock_adjustment",
  href: "stock_adjustment",
  sublinks: [
    {
      icon: LuPlusCircle,
      label: { bn: "স্টক সহযোজন নিবন্ধন", en: "Add Stock Adjustment" },
      key: "add_stock_adjustment",
      href: "add_stock_adjustment",
    },
    {
      icon: LuListOrdered,
      label: { bn: "স্টক সহযোজন তালিকা", en: "Stock Adjustment List" },
      key: "stock_adjustment_list",
      href: "stock_adjustment_list",
    },
  ],
};
// HUMAN RESOURCE LINKS
const human_resource_management_links = {
  icon: LuCommand,
  label: { bn: "এইচআরএম", en: "HRM" },
  key: "hrm",
  href: "hrm",
  sublinks: [
    // staff
    {
      icon: LuPlusCircle,
      label: { bn: "স্টাফ নিবন্ধন", en: "Add Staff" },
      key: "add_staff",
      href: "add_staff",
    },
    {
      icon: LuListOrdered,
      label: { bn: "স্টাফ তালিকা", en: "Staff List" },
      key: "staff_list",
      href: "staff_list",
    },
    // staff payment
    {
      icon: LuPlusCircle,
      label: { bn: "স্টাফ পেমেন্ট নিবন্ধন", en: "Add Staff Payment" },
      key: "add_staff_payment",
      href: "add_staff_payment",
    },
    {
      icon: LuListOrdered,
      label: { bn: "স্টাফ পেমেন্ট তালিকা", en: "Staff Payment List" },
      key: "staff_payment_list",
      href: "staff_payment_list",
    },
    // staff Salary
    {
      icon: LuPlusCircle,
      label: { bn: "স্টাফ বেতন নিবন্ধন", en: "Add Staff Salary" },
      key: "add_staff_salary",
      href: "add_staff_salary",
    },
    {
      icon: LuListOrdered,
      label: { bn: "স্টাফ বেতন তালিকা", en: "Staff Salary List" },
      key: "staff_salary_list",
      href: "staff_salary_list",
    },
    // staff salary report
    {
      icon: LuFilePieChart,
      label: { bn: "স্টাফ বেতন রিপোর্ট", en: "Staff Salary Report" },
      key: "staff_salary_reports",
      href: "staff_salary_reports",
    },
    // staff Attendance
    {
      icon: LuPlusCircle,
      label: { bn: "স্টাফ উপস্থিতি", en: "Staff Attendance" },
      key: "staff_attendance",
      href: "staff_attendance",
    },
    // staff Attendance report
    {
      icon: LuBadgeAlert,
      label: { bn: "স্টাফ উপস্থিতি রিপোর্ট", en: "Staff Attendance Report" },
      key: "staff_attendance_report",
      href: "staff_attendance_report",
    },
    // over time
    {
      icon: LuListOrdered,
      label: { bn: "ওভার টাইম", en: "Over Time" },
      key: "over_time_list",
      href: "over_time_list",
    },
  ],
};

export const ADMIN_NAVIGATION_LINKS = [
  // CONTACT LINKS (including)
  { ...contacts_links },
  // PRODUCT MANAGEMENT LINKS (including)
  { ...product_management_links },
  // PRODUCT PURCHASE LINKS (including)
  { ...product_purchase_links },
  // SELL LINKS (including)
  { ...product_sell_links },
  //EXPENSE LINKS (including)
  { ...expense_links },
  // PAYMENT ACCOUNT LINKS
  { ...payment_account_links },
  // DETAILS REPORTS
  { ...details_report_links },
  // SETTINGS
  { ...settings_links },
  // PRODUCT PURCHASE LINKS
  { ...due_reports_links },
  // PAYMENT REPORTS LINKS
  { ...payment_reports_links },
  // STOCK TRANSFER LINKS
  { ...stock_transfer_links },
  // STOCK ADJUSTMENT LINKS
  { ...stock_adjustment_links },
  // HUMAN RESOURCE MANAGEMENT LINKS
  { ...human_resource_management_links },
];

// NOT NEED FOR THIS PROJECT FOR NOW, DO NOT UNMASK THIS CODE
