import { DataTable } from "./table";
import { columns } from "./column";

export const Merchants = () => {
  return (
    <DataTable
      data={[
        { uid: "984 Coffee", value: 4000 },
        { uid: "Cocaine", value: 4000 },
        { uid: "Meth", value: 4000 },
        { uid: "Pot", value: 4000 },
        { uid: "Heroine", value: 4000 },
        { uid: "Acid", value: 4000 },
        { uid: "DMT", value: 4000 },
      ]}
      loading={false}
      toolbarActions={[false, () => false]}
      columns={columns}
    />
  );
};
