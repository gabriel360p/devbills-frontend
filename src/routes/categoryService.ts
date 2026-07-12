import { Api } from "../services/Api";
import type { Category } from "../types/category";

export async function geCategories(): Promise<Category[]> {
    const { data } = await Api.get('/categorias');
    console.log(data)
    return data;
}