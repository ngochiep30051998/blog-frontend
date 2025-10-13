import { useState } from 'react';
import { Badge, Dropdown, Avatar, Input } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [notificationCount] = useState(5);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  const notificationItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="py-2">
          <p className="font-medium text-sm">Bài viết mới</p>
          <p className="text-xs text-gray-500">Có 3 bài viết mới chờ duyệt</p>
          <p className="text-xs text-gray-400 mt-1">5 phút trước</p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="py-2">
          <p className="font-medium text-sm">Bình luận mới</p>
          <p className="text-xs text-gray-500">2 bình luận mới cần kiểm duyệt</p>
          <p className="text-xs text-gray-400 mt-1">10 phút trước</p>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'view-all',
      label: (
        <div className="text-center text-blue-600 font-medium">
          Xem tất cả thông báo
        </div>
      ),
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MenuOutlined className="text-gray-600 text-xl" />
        </button>

        {/* Search */}
        <div className="hidden md:block max-w-md flex-1">
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-lg"
            size="large"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <SearchOutlined className="text-gray-600 text-xl" />
        </button>

        {/* Notifications */}
        <Dropdown
          menu={{ items: notificationItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Badge count={notificationCount} size="small">
              <BellOutlined className="text-gray-600 text-xl" />
            </Badge>
          </button>
        </Dropdown>

        {/* User Menu */}
        <Dropdown
          menu={{ items: userMenuItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Avatar
              size="default"
              icon={<UserOutlined />}
              className="bg-blue-500"
            />
            <span className="hidden lg:inline text-sm font-medium text-gray-700">
              Admin User
            </span>
          </button>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
