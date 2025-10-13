import { useState } from 'react';
import { Table, Button, Space, Tag, Input, Select, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import PageHeader from '../../../components/PageHeader';
import Card from '../../../components/Card';
import type { ColumnsType } from 'antd/es/table';

interface Post {
  key: string;
  id: number;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
  views: number;
  createdAt: string;
}

const Posts = () => {
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data
  const [posts] = useState<Post[]>([
    {
      key: '1',
      id: 1,
      title: 'Hướng dẫn sử dụng React Hooks trong dự án thực tế',
      author: 'Admin User',
      category: 'React',
      status: 'published',
      views: 1234,
      createdAt: '2025-10-13 10:30',
    },
    {
      key: '2',
      id: 2,
      title: 'Tối ưu hiệu suất ứng dụng với Next.js 14',
      author: 'Editor User',
      category: 'Next.js',
      status: 'published',
      views: 987,
      createdAt: '2025-10-12 14:20',
    },
    {
      key: '3',
      id: 3,
      title: 'Tailwind CSS - Tips & Tricks cho người mới',
      author: 'Admin User',
      category: 'CSS',
      status: 'draft',
      views: 765,
      createdAt: '2025-10-11 09:15',
    },
    {
      key: '4',
      id: 4,
      title: 'TypeScript Best Practices 2025',
      author: 'Developer',
      category: 'TypeScript',
      status: 'pending',
      views: 543,
      createdAt: '2025-10-10 16:45',
    },
    {
      key: '5',
      id: 5,
      title: 'Xây dựng RESTful API với Node.js và Express',
      author: 'Admin User',
      category: 'Node.js',
      status: 'published',
      views: 2100,
      createdAt: '2025-10-09 11:00',
    },
  ]);

  const handleDelete = (id: number) => {
    console.log('Delete post:', id);
    // Implement delete logic
  };

  const handleEdit = (id: number) => {
    console.log('Edit post:', id);
    // Navigate to edit page
  };

  const handleView = (id: number) => {
    console.log('View post:', id);
    // Navigate to view page
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'green';
      case 'draft':
        return 'default';
      case 'pending':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã xuất bản';
      case 'draft':
        return 'Bản nháp';
      case 'pending':
        return 'Chờ duyệt';
      default:
        return status;
    }
  };

  const columns: ColumnsType<Post> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: (text: string) => (
        <a className="text-blue-600 hover:text-blue-800 font-medium">{text}</a>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      width: 120,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id)}
            title="Xem"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Xóa bài viết"
            description="Bạn có chắc chắn muốn xóa bài viết này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} title="Xóa" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý bài viết"
        description="Danh sách tất cả bài viết trong hệ thống"
        extra={
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Thêm bài viết
          </Button>
        }
      />

      <Card>
        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm bài viết..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-xs"
            size="large"
          />
          <Select
            value={selectedStatus}
            onChange={setSelectedStatus}
            className="w-40"
            size="large"
            options={[
              { label: 'Tất cả', value: 'all' },
              { label: 'Đã xuất bản', value: 'published' },
              { label: 'Bản nháp', value: 'draft' },
              { label: 'Chờ duyệt', value: 'pending' },
            ]}
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={posts}
          loading={loading}
          pagination={{
            total: posts.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} bài viết`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default Posts;
