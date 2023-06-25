import { useEffect, useState } from "react";
import { getOpenRoles } from "../../../../Firebase/FirebaseFunctions/Role";
import MultiSelect, { Option } from "./CustomSelectRolesDropMenu";

export default function RolesMultiSelect(props: { optionSelected: any, setSelected: any }) {
  const { optionSelected, setSelected } = props;

  const [roles, setRoles] = useState<Option[]>([]);


  const handleChange = (selected: Option[]) => {
    setSelected(selected);
  };


  const fetchRoles = async () => {
    let temp  = await getOpenRoles();
    setRoles(temp?.map((role, index) => ({value: index, label: role?._name})));
  }

  useEffect(() => {
    fetchRoles();
}, []);

  return (
    <MultiSelect
      options={roles}
      onChange={handleChange}
      value={optionSelected}
      isSelectAll={true}
      menuPlacement={"bottom"}
    />
  );
}