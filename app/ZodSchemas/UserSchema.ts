import z from "zod";

export const GeoSchema = z.object({
    lat: z.string(),
    lng: z.string(),
});

export type TGeo = z.infer<typeof GeoSchema>;

export const AddressSchema = z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: GeoSchema,
});

export type TAddress = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: TGeo;
};

export const CompanySchema = z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
});

export type TCompany = z.infer<typeof CompanySchema>;

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    address: AddressSchema,
    phone: z.string(),
    website: z.string(),
    company: CompanySchema,
});

export const UsersSchema = z.array(UserSchema);

export type TUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: TAddress;
    phone: string;
    website: string;
    company: TCompany;
};
