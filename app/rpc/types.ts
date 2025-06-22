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
