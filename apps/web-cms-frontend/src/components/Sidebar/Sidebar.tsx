import { Menu } from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  TagsOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem('Dashboard', '/home', <HomeOutlined />),
  getItem('Bài viết', '/posts', <FileTextOutlined />, [
    getItem('Tất cả bài viết', ''),
    getItem('Thêm mới', '/posts/create'),
  ]),
  getItem('Danh mục', '/categories', <TagsOutlined />),
  getItem('Bình luận', '/comments', <CommentOutlined />),
  getItem('Người dùng', '/users', <UserOutlined />),
  getItem('Cài đặt', '/settings', <SettingOutlined />),
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Admin CMS</h1>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['/posts']}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-r-0"
        />
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UserOutlined className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
