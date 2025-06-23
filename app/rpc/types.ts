type Nullable<T> = T | null;

export interface GetProfileRequest {
    firstName: string;
    lastName: string;
    countryCode: Nullable<string>;
    contactNumber: Nullable<string>;
    birthOfDate: Nullable<string>;
    placeOfBirth: Nullable<string>;
    address: Nullable<string>;
}

export interface GetProfileResponse {
    message: string;
    profile: {
        firstName: string;
        lastName: string;
        countryCode: Nullable<string>;
        contactNumber: Nullable<string>;
        birthOfDate: Nullable<Date>;
        placeOfBirth: Nullable<string>;
        address: Nullable<string>;
        user: {
            email: string;
        };
    };
}

export interface GetChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface GetChangePasswordResponse {
    message: string;
}

export interface GetRoleListQueryParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface GetRoleListResponse {
    roles: {
        id: number;
        name: string;
    }[];
    meta: {
        totalData: number;
        currentPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        pages: number[];
        totalPage: number;
    };
}

export interface GetRoleResponse {
    message: string;
    role: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        permissions: Permission[];
    };
}

type Permission = {
    permission: {
        name: string;
    };
};
