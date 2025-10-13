import { Table, Button, Space, Tag, Input, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import Card from '../../../components/Card';
import type { ColumnsType } from 'antd/es/table';

interface Category {
  key: string;
  id: number;
  name: string;
  slug: string;
  postCount: number;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const Categories = () => {
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [categories] = useState<Category[]>([
    {
      key: '1',
      id: 1,
      name: 'React',
      slug: 'react',
      postCount: 45,
      description: 'Bài viết về React và React ecosystem',
      status: 'active',
      createdAt: '2025-01-15',
    },
    {
      key: '2',
      id: 2,
      name: 'Next.js',
      slug: 'nextjs',
      postCount: 32,
      description: 'Hướng dẫn và tips về Next.js',
      status: 'active',
      createdAt: '2025-02-10',
    },
    {
      key: '3',
      id: 3,
      name: 'TypeScript',
      slug: 'typescript',
      postCount: 28,
      description: 'TypeScript best practices',
      status: 'active',
      createdAt: '2025-03-05',
    },
    {
      key: '4',
      id: 4,
      name: 'CSS',
      slug: 'css',
      postCount: 56,
      description: 'CSS và styling',
      status: 'inactive',
      createdAt: '2025-01-20',
    },
  ]);

  const handleDelete = (id: number) => {
    console.log('Delete category:', id);
  };

  const columns: ColumnsType<Category> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (text: string) => (
        <code className="px-2 py-1 bg-gray-100 rounded text-sm">{text}</code>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số bài viết',
      dataIndex: 'postCount',
      key: 'postCount',
      width: 120,
      align: 'center',
      render: (count: number) => (
        <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full font-medium">
          {count}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => console.log('Edit', record.id)}
          />
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Danh mục"
        description="Quản lý danh mục bài viết"
        extra={
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Thêm danh mục
          </Button>
        }
      />

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Tìm kiếm danh mục..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-xs"
            size="large"
          />
        </div>

        <Table
          columns={columns}
          dataSource={categories}
          loading={loading}
          pagination={{
            total: categories.length,
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} danh mục`,
          }}
        />
      </Card>
    </div>
  );
};

export default Categories;
