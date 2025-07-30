// Cần rút các trường chung vào BaseEntity
// Để tránh lặp lại trong các entity khác
interface IBaseEntity {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: Date;
    modifiedFullName?: string;
}

export type { IBaseEntity as I };
