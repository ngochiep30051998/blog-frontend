import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface BreadcrumbItem {
  title: string;
  path?: string;
}

const routeMap: Record<string, string> = {
  home: 'Dashboard',
  posts: 'Bài viết',
  create: 'Thêm mới',
  edit: 'Chỉnh sửa',
  categories: 'Danh mục',
  comments: 'Bình luận',
  users: 'Người dùng',
  settings: 'Cài đặt',
};

export function Breadcrumb() {
  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    const items: BreadcrumbItem[] = [
      {
        title: 'Trang chủ',
        path: '/home',
      },
    ];

    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      
      items.push({
        title: routeMap[segment] || segment,
        path: isLast ? undefined : currentPath,
      });
    });

    return items;
  }, [location.pathname]);

  return (
    <div className="mb-4">
      <AntBreadcrumb
        items={breadcrumbItems.map((item, index) => ({
          title: index === 0 ? (
            <Link to={item.path || '#'} className="flex items-center gap-1">
              <HomeOutlined />
              <span>{item.title}</span>
            </Link>
          ) : item.path ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            <span>{item.title}</span>
          ),
        }))}
      />
    </div>
  );
}

export default Breadcrumb;
