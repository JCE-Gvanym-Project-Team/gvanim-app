import { useEffect, useState } from "react";
import  MultiSelect, { Option } from "./CustomSelectLocationsDropMenu";
import { getFilteredJobs } from "../../../../Firebase/FirebaseFunctions/Job";

export default function LocationMultiSelect(props: { optionSelected: any, setSelected: any }) {
  const { optionSelected, setSelected } = props;
  const [locations, setLocations] = useState<Option[]>([]);


  const handleChange = (selected: Option[]) => {
    setSelected(selected);
  };


  const fetchLocations = async () => {
    let jobs = await getFilteredJobs();
    let loc: string[] = [];
    for (let job in jobs)
      if (!loc.includes(jobs[job]?._region)) {
        let loc_split = jobs[job]?._region.split(",");
        loc_split.forEach((loc_) => { loc_?.length !== 0 && loc.push(loc_)});
      }
    setLocations(loc.map((location_, index) => ({ value: index, label: location_! })));
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
        <MultiSelect
          options={locations}
          onChange={handleChange}
          value={optionSelected}
          isSelectAll={true}
          menuPlacement={"bottom"}
        />
    </>
  );
}

