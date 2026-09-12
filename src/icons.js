import * as Fi from "react-icons/fi";
import * as Lu from "react-icons/lu";
import * as Tb from "react-icons/tb";
import { useDesign } from "./hooks/useDesign.js";

const iconDefs = {
  ArrowRight: { feather: Fi.FiArrowRight, lucide: Lu.LuArrowRight, tabler: Tb.TbArrowRight },
  ArrowLeft: { feather: Fi.FiArrowLeft, lucide: Lu.LuArrowLeft, tabler: Tb.TbArrowLeft },
  Menu: { feather: Fi.FiMenu, lucide: Lu.LuMenu, tabler: Tb.TbMenu2 },
  X: { feather: Fi.FiX, lucide: Lu.LuX, tabler: Tb.TbX },
  Home: { feather: Fi.FiHome, lucide: Lu.LuHouse, tabler: Tb.TbHome },
  Settings: { feather: Fi.FiSettings, lucide: Lu.LuSettings, tabler: Tb.TbSettings },
  HelpCircle: { feather: Fi.FiHelpCircle, lucide: Lu.LuCircleHelp, tabler: Tb.TbHelpCircle },
  Sun: { feather: Fi.FiSun, lucide: Lu.LuSun, tabler: Tb.TbSun },
  Moon: { feather: Fi.FiMoon, lucide: Lu.LuMoon, tabler: Tb.TbMoon },
  Globe: { feather: Fi.FiGlobe, lucide: Lu.LuGlobe, tabler: Tb.TbWorld },
  TrendingUp: { feather: Fi.FiTrendingUp, lucide: Lu.LuTrendingUp, tabler: Tb.TbTrendingUp },
  Shield: { feather: Fi.FiShield, lucide: Lu.LuShieldCheck, tabler: Tb.TbShieldCheck },
  Users: { feather: Fi.FiUsers, lucide: Lu.LuUsers, tabler: Tb.TbUsers },
  User: { feather: Fi.FiUser, lucide: Lu.LuUser, tabler: Tb.TbUser },
  UserPlus: { feather: Fi.FiUserPlus, lucide: Lu.LuUserPlus, tabler: Tb.TbUserPlus },
  UserCheck: { feather: Fi.FiUserCheck, lucide: Lu.LuUserCheck, tabler: Tb.TbUserCheck },
  Mail: { feather: Fi.FiMail, lucide: Lu.LuMail, tabler: Tb.TbMail },
  Lock: { feather: Fi.FiLock, lucide: Lu.LuLock, tabler: Tb.TbLock },
  Bell: { feather: Fi.FiBell, lucide: Lu.LuBell, tabler: Tb.TbBell },
  Search: { feather: Fi.FiSearch, lucide: Lu.LuSearch, tabler: Tb.TbSearch },
  Plus: { feather: Fi.FiPlus, lucide: Lu.LuPlus, tabler: Tb.TbPlus },
  PlusCircle: { feather: Fi.FiPlusCircle, lucide: Lu.LuCirclePlus, tabler: Tb.TbCirclePlus },
  PlusSquare: { feather: Fi.FiPlusSquare, lucide: Lu.LuSquarePlus, tabler: Tb.TbSquarePlus },
  Calendar: { feather: Fi.FiCalendar, lucide: Lu.LuCalendar, tabler: Tb.TbCalendar },
  Clock: { feather: Fi.FiClock, lucide: Lu.LuClock, tabler: Tb.TbClock },
  CreditCard: { feather: Fi.FiCreditCard, lucide: Lu.LuCreditCard, tabler: Tb.TbCreditCard },
  DollarSign: { feather: Fi.FiDollarSign, lucide: Lu.LuDollarSign, tabler: Tb.TbCurrencyDollar },
  Coins: { feather: Fi.FiDollarSign, lucide: Lu.LuCoins, tabler: Tb.TbCoins },
  Tag: { feather: Fi.FiTag, lucide: Lu.LuTag, tabler: Tb.TbTag },
  Grid: { feather: Fi.FiGrid, lucide: Lu.LuLayoutGrid, tabler: Tb.TbLayoutGrid },
  List: { feather: Fi.FiList, lucide: Lu.LuList, tabler: Tb.TbList },
  LogOut: { feather: Fi.FiLogOut, lucide: Lu.LuLogOut, tabler: Tb.TbLogout },
  Trash: { feather: Fi.FiTrash2, lucide: Lu.LuTrash2, tabler: Tb.TbTrash },
  ChevronRight: { feather: Fi.FiChevronRight, lucide: Lu.LuChevronRight, tabler: Tb.TbChevronRight },
  ChevronDown: { feather: Fi.FiChevronDown, lucide: Lu.LuChevronDown, tabler: Tb.TbChevronDown },
  Edit: { feather: Fi.FiEdit3, lucide: Lu.LuPencil, tabler: Tb.TbEdit },
  Check: { feather: Fi.FiCheck, lucide: Lu.LuCheck, tabler: Tb.TbCheck },
  CheckCircle: { feather: Fi.FiCheckCircle, lucide: Lu.LuCircleCheck, tabler: Tb.TbCircleCheck },
  Save: { feather: Fi.FiSave, lucide: Lu.LuSave, tabler: Tb.TbDeviceFloppy },
  Info: { feather: Fi.FiInfo, lucide: Lu.LuInfo, tabler: Tb.TbInfoCircle },
  Phone: { feather: Fi.FiPhone, lucide: Lu.LuPhone, tabler: Tb.TbPhone },
  MapPin: { feather: Fi.FiMapPin, lucide: Lu.LuMapPin, tabler: Tb.TbMapPin },
  Message: { feather: Fi.FiMessageSquare, lucide: Lu.LuMessageSquare, tabler: Tb.TbMessage2 },
  Type: { feather: Fi.FiType, lucide: Lu.LuType, tabler: Tb.TbTypography },
  Send: { feather: Fi.FiSend, lucide: Lu.LuSend, tabler: Tb.TbSend },
  Shuffle: { feather: Fi.FiShuffle, lucide: Lu.LuShuffle, tabler: Tb.TbArrowsShuffle },
  Hash: { feather: Fi.FiHash, lucide: Lu.LuHash, tabler: Tb.TbHash },
  Database: { feather: Fi.FiDatabase, lucide: Lu.LuDatabase, tabler: Tb.TbDatabase },
  FileText: { feather: Fi.FiFileText, lucide: Lu.LuFileText, tabler: Tb.TbFileText },
  Activity: { feather: Fi.FiActivity, lucide: Lu.LuActivity, tabler: Tb.TbActivity },
  Smartphone: { feather: Fi.FiSmartphone, lucide: Lu.LuSmartphone, tabler: Tb.TbDeviceMobile },
  Instagram: { feather: Fi.FiInstagram, lucide: Lu.LuInstagram, tabler: Tb.TbBrandInstagram },
  Twitter: { feather: Fi.FiTwitter, lucide: Lu.LuTwitter, tabler: Tb.TbBrandX },
  Github: { feather: Fi.FiGithub, lucide: Lu.LuGithub, tabler: Tb.TbBrandGithub },
  Wallet: { feather: Fi.FiCreditCard, lucide: Lu.LuWallet, tabler: Tb.TbWallet },
  Palette: { feather: Fi.FiDroplet, lucide: Lu.LuPalette, tabler: Tb.TbColorSwatch },
  Eye: { feather: Fi.FiEye, lucide: Lu.LuEye, tabler: Tb.TbEye },
};

export function useIcons() {
  const { iconSet = "tabler" } = useDesign();
  const icons = {};
  for (const key of Object.keys(iconDefs)) {
    icons[key] = iconDefs[key][iconSet] || iconDefs[key].tabler;
  }
  return icons;
}