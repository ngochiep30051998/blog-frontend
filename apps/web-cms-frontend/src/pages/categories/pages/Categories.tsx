import { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Popconfirm, message, Tooltip, Badge } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import PageHeader from '../../../components/PageHeader';
import Card from '../../../components/Card';
import CategoryFormModal from '../components/CategoryFormModal';
import { ICategory } from '@blog-frontend/shared';
import categoryService from '../../../services/category.service';
import type { ColumnsType } from 'antd/es/table';
import '../categories.css';

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = categories.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchText.toLowerCase()) ||
          cat.description?.toLowerCase().includes(searchText.toLowerCase()) ||
          cat.slug.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchText, categories]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryService.getAll();
      if (response.data) {
        setCategories(response.data);
        setFilteredCategories(response.data);
      }
    } catch (error: any) {
      message.error(error?.message || 'Không thể tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryService.delete(id);
      message.success('Xóa danh mục thành công!');
      loadCategories();
    } catch (error: any) {
      message.error(error?.message || 'Không thể xóa danh mục');
    }
  };

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  const handleModalSuccess = () => {
    loadCategories();
  };

  const getCategoryLevel = (categoryId: string): number => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category || !category.parentId) return 0;
    return 1 + getCategoryLevel(category.parentId);
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left',
      render: (text: string, record: ICategory) => {
        const level = record.level || getCategoryLevel(record.id);
        const indent = level * 20;
        return (
          <div className="flex items-center gap-3" style={{ paddingLeft: `${indent}px` }}>
            {record.icon && (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: record.color || '#3b82f6' }}
              >
                <i className={record.icon} />
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium text-gray-900">{text}</div>
              <div className="text-xs text-gray-500">{record.slug}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) =>
        text ? (
          <Tooltip title={text}>
            <span className="text-sm text-gray-600">{text}</span>
          </Tooltip>
        ) : (
          <span className="text-xs text-gray-400 italic">Chưa có mô tả</span>
        ),
    },
    {
      title: 'Ảnh bìa',
      dataIndex: 'coverImageUrl',
      key: 'coverImageUrl',
      width: 100,
      align: 'center',
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="Cover"
            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <EyeOutlined className="text-gray-400" />
          </div>
        ),
    },
    {
      title: 'Số bài viết',
      dataIndex: 'postCount',
      key: 'postCount',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.postCount - b.postCount,
      render: (count: number) => (
        <Badge
          count={count}
          showZero
          style={{ backgroundColor: count > 0 ? '#52c41a' : '#d9d9d9' }}
        />
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'totalViews',
      key: 'totalViews',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.totalViews - b.totalViews,
      render: (views: number) => (
        <span className="text-sm font-medium text-blue-600">
          {views.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Thứ tự',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 80,
      align: 'center',
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 120,
      align: 'center',
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Không hoạt động', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'default'}>
          {isActive ? 'Hoạt động' : 'Tắt'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-blue-600 hover:text-blue-700"
            />
          </Tooltip>
          <Popconfirm
            title="Xóa danh mục"
            description={
              <div>
                <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
                {record.postCount > 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    Cảnh báo: Danh mục có {record.postCount} bài viết!
                  </p>
                )}
              </div>
            }
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                className="hover:text-red-600"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý danh mục"
        description={`Tổng ${categories.length} danh mục`}
        extra={
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadCategories}
              loading={loading}
              size="large"
            >
              Làm mới
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              size="large"
            >
              Thêm danh mục
            </Button>
          </Space>
        }
      />

      <Card>
        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Tìm kiếm theo tên, slug, mô tả..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
            size="large"
            allowClear
          />
          <div className="flex-1 text-right text-sm text-gray-500">
            Hiển thị <span className="font-medium">{filteredCategories.length}</span> /{' '}
            <span className="font-medium">{categories.length}</span> danh mục
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCategories}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredCategories.length,
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} danh mục`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          scroll={{ x: 1400 }}
          className="category-table"
        />
      </Card>

      <CategoryFormModal
        visible={modalVisible}
        category={selectedCategory}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default Categories;
