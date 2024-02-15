// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import {
  AddMaterialMutationResponse,
  Material,
} from "./__generated__/resolvers-types";

const MaterialDB: Omit<Required<Material>, "__typename">[] = [];

export class MaterialsDataSource {
  getMaterials(): Material[] {
    return MaterialDB;
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  // async addMaterial(material: Material): Promise<AddMaterialMutationResponse> {
  //   if (
  //     material.material &&
  //     material.amount &&
  //     material.currency &&
  //     material.price &&
  //     material.timestamp &&
  //     material.delivery
  //   ) {
  //     MaterialDB.push(material);

  //     return {
  //       code: "200",
  //       success: true,
  //       message: "New material added!",
  //       material,
  //     };
  //   } else {
  //     return {
  //       code: "400",
  //       success: false,
  //       message: "Invalid input",
  //       material: null,
  //     };
  //   }
  // }
}
