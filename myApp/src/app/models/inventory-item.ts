export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface InventoryItem {
  id: number;           // 产品ID
  name: string;         // 产品名称
  category: string;     // 产品类别
  quantity: number;     // 产品数量
  price: number;        // 产品价格
  stockStatus: string;  // 库存状态（例如：In Stock, Out of Stock）
  featured: boolean;     // 是否为特色产品（1 是，0 否）
  specialNote: string;  // 特别备注
  supplier: string;     // 供应商名称
}
