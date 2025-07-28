// db.ts
import * as SQLite from 'expo-sqlite';

// 打开数据库
const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('inventory.db');
};

// 初始化资料表
export const initDB = async () => {
  const db = await openDatabase();
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS areas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      created_at TEXT,
      updated_at TEXT
    );
  `);
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tires (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      spec TEXT,
      area_id INTEGER,
      quantity INTEGER,
      created_at TEXT,
      updated_at TEXT,
      UNIQUE(spec, area_id)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tires_1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      spec TEXT,
      area_id INTEGER,
      quantity INTEGER,
      created_at TEXT,
      updated_at TEXT,
      UNIQUE(spec, area_id)
    );
  `);

    initDefaultAreas();
};

// 取得所有区域
export const getAreas = async (): Promise<{ id: number; name: string }[]> => {
  const db = await openDatabase();
  const result = await db.getAllAsync('SELECT id, name FROM areas;');  
  return result as { id: number; name: string }[];
};

// 新增区域
export const addArea = async (name: string): Promise<void> => {
  const db = await openDatabase();
  await db.runAsync('INSERT INTO areas (name) VALUES (?);', [name]);
};

// 取得所有资料表名称
export const getAllTableNames = async (): Promise<string[]> => {
  const db = await openDatabase();
  const result = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
  );
  return result.map((row: any) => row.name);
};

// 初始化预设区域
export const initDefaultAreas = async (): Promise<void> => {
  const defaultAreas = ['店裡', '店外', '倉庫內', '倉庫外'];
  
  try {
    const db = await openDatabase();
    
    for (const areaName of defaultAreas) {
      // 使用 INSERT OR IGNORE 避免重复插入
      await db.runAsync('INSERT OR IGNORE INTO areas (name) VALUES (?);', [areaName]);
    }
    
    console.log('✓ 预设区域初始化完成');
  } catch (error) {
    console.error('预设区域初始化失败:', error);
    throw error;
  }
};

// 查询并输出所有区域名称
export const getAreaNamesAndLog = async (): Promise<string[]> => {
  try {
    const db = await openDatabase();
    const result = await db.getAllAsync('SELECT name FROM areas;');
    
    console.log('=== Areas Name Column ===');
    console.log('Raw result:', result);
    
    const names = result.map((row: any) => row.name);
    console.log('Area names:', names);
    console.log('Total areas:', names.length);
    console.log('========================');
    
    return names;
  } catch (error) {
    console.error('Error getting area names:', error);
    return [];
  }
};

// 更新區域名稱
export const updateAreaName = async (oldName: string, newName: string): Promise<void> => {
  try {
    const db = await openDatabase();
    await db.runAsync('UPDATE areas SET name = ? WHERE name = ?;', [newName, oldName]);
    console.log(`✓ 區域名稱已更新：${oldName} → ${newName}`);
  } catch (error) {
    console.error('更新區域名稱失敗:', error);
    throw error;
  }
};

// 新增/更新輪胎數量（使用區域名稱）
export const addTire = async (spec: string, areaName: string, quantity: number): Promise<void> => {
  try {
    const db = await openDatabase();    
    // 先找到區域ID
    const areaResult = await db.getAllAsync('SELECT id FROM areas WHERE name = ?;', [areaName]);
    
    if (areaResult.length === 0) {
      throw new Error(`找不到區域：${areaName}`);
    }
    
    const areaId = (areaResult[0] as any).id;
    const now = getCurrentTimestamp();
    
    // 檢查是否已存在相同規格和區域的輪胎
    const existingTire = await db.getAllAsync(
      'SELECT id, quantity FROM tires_1 WHERE spec = ? AND area_id = ?;',
      [spec, areaId]
    );    
    
    if (existingTire.length > 0) {
      // 如果存在，增加數量
      const currentQuantity = (existingTire[0] as any).quantity;
      const newQuantity = currentQuantity + quantity;
      
      await db.runAsync(
        'UPDATE tires_1 SET quantity = ?, updated_at = ? WHERE spec = ? AND area_id = ?;',
        [newQuantity, now, spec, areaId]
      );
      console.log(`✓ 增加輪胎：${spec} 在 ${areaName}，原數量：${currentQuantity}，增加：${quantity}，新數量：${newQuantity}`);
    } else {
      // 如果不存在，新增記錄
      await db.runAsync(
        'INSERT INTO tires_1 (spec, area_id, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?);',
        [spec, areaId, quantity, now, now]
      );
      console.log(`✓ 新增輪胎：${spec} 到 ${areaName}，數量：${quantity}`);
    }
    
  } catch (error) {
    console.error('新增輪胎失敗:', error);
    throw error;
  }
};

// 取得特定區域的輪胎（用區域名稱）
export const getTiresByAreaName = async (areaName: string): Promise<any[]> => {
  try {
    const db = await openDatabase();
    console.log(db);
    // 先找到區域ID
    const areaResult = await db.getAllAsync('SELECT id FROM areas WHERE name = ?;', [areaName]);
    
    if (areaResult.length === 0) {
      throw new Error(`找不到區域：${areaName}`);
    }
    
    const areaId = (areaResult[0] as any).id;
    const result = await db.getAllAsync('SELECT * FROM tires_1 WHERE area_id = ?;', [areaId]);
    
    return result;
  } catch (error) {
    console.error('查詢輪胎失敗:', error);
    return [];
  }
};

function getCurrentTimestamp() {
    return new Date().toISOString();
    // throw new Error('Function not implemented.');
}
