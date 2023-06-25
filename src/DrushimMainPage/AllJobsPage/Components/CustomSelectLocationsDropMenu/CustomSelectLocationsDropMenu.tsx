import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { default as ReactSelect, components, InputAction, PlaceholderProps, IndicatorSeparatorProps, DropdownIndicatorProps } from "react-select";


export type Option = {
    value: number | string;
    label: string;
};

const MultiSelect = (props: any) => {
    const [loading, setLoading] = useState(true);

    const [selectInput, setSelectInput] = useState<string>("");
    const isAllSelected = useRef<boolean>(false);
    const selectAllLabel = useRef<string>("Select all");
    const allOption = { value: "*", label: selectAllLabel.current };


    const filterOptions = (options: Option[], input: string) =>
        options?.filter(({ label }: Option) =>
            label.toLowerCase().includes(input.toLowerCase())
        );

    const comparator = (v1: Option, v2: Option) =>
        (v1.value as number) - (v2.value as number);

    let filteredOptions = filterOptions(props.options, selectInput);
    let filteredSelectedOptions = filterOptions(props.value, selectInput);

    const Option = (props: any) => (
        <Box sx={{ borderBottom: '1px solid #CCCCCC' }}>
            <components.Option {...props}>
                <Stack direction='row' margin={0.5} spacing={1}>
                    {props.value === "*" &&
                        !isAllSelected.current &&
                        filteredSelectedOptions?.length > 0 ? (
                        <input

                            key={props.value}
                            type="checkbox"
                            style={{ color: 'green' }}
                            ref={(input) => {
                                if (input) input.indeterminate = true;
                            }}
                        />
                    ) : (
                        <input
                            key={props.value}
                            type="checkbox"
                            style={{ color: 'green' }}
                            checked={props.isSelected || isAllSelected.current}
                            onChange={() => { }}
                        />
                    )}
                    <Box sx={{
                        fontFamily: 'Rubik',
                        fontSize: '15px',
                        letterSpacing: '0px',
                        color: '#6E6E6E',
                        opacity: 1
                    }}>{props.label}</Box>
                </Stack>
            </components.Option>


        </Box>
    );

    const Input = (props: any) => (
        <>
            {selectInput.length === 0 ? (
                <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
                    {props.children}
                </components.Input>
            ) : (
                <div style={{ border: "1px dotted gray" }}>
                    <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
                        {props.children}
                    </components.Input>
                </div>
            )}
        </>
    );

    const DropdownIndicator = (
        props: DropdownIndicatorProps<any, true>
    ) => {
        return (
            <components.DropdownIndicator {...props}>
                <KeyboardArrowDown fontSize='small' sx={{ color: '#053B7A' }} />
            </components.DropdownIndicator>
        );
    };

    const customFilterOption = ({ value, label }: Option, input: string) =>
        (value !== "*" && label.toLowerCase().includes(input.toLowerCase())) ||
        (value === "*" && filteredOptions?.length > 0);

    const onInputChange = (
        inputValue: string,
        event: { action: InputAction }
    ) => {
        if (event.action === "input-change") setSelectInput(inputValue);
        else if (event.action === "menu-close" && selectInput !== "")
            setSelectInput("");
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if ((e.key === " " || e.key === "Enter") && !selectInput)
            e.preventDefault();
    };

    const handleChange = (selected: Option[]) => {
        if (
            selected.length > 0 &&
            !isAllSelected.current &&
            (selected[selected.length - 1].value === allOption.value ||
                JSON.stringify(filteredOptions) ===
                JSON.stringify(selected.sort(comparator)))
        )
            return props.onChange(
                [
                    ...(props.value ?? []),
                    ...props.options.filter(
                        ({ label }: Option) =>
                            label.toLowerCase().includes(selectInput?.toLowerCase()) &&
                            (props.value ?? []).filter((opt: Option) => opt.label === label)
                                .length === 0
                    ),
                ].sort(comparator)
            );
        else if (
            selected.length > 0 &&
            selected[selected.length - 1].value !== allOption.value &&
            JSON.stringify(selected.sort(comparator)) !==
            JSON.stringify(filteredOptions)
        )
            return props.onChange(selected);
        else
            return props.onChange([
                ...props.value?.filter(
                    ({ label }: Option) =>
                        !label.toLowerCase().includes(selectInput?.toLowerCase())
                ),
            ]);
    };

    const customStyles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            border: 0,
            backgroundColor: '#EDEDED',
        }),

        multiValueLabel: (def: any) => ({
            ...def,
            // backgroundColor: "#053B7A",
            // color: '#fff',
            fontSize: 'small',
            padding: 1,
        }),
        multiValueRemove: (def: any) => ({
            ...def,
            backgroundColor: "unset",
        }),
        valueContainer: (base: any) => ({
            ...base,
            maxHeight: "65px",
            overflow: "auto",
        }),
        option: (styles: any, { isSelected, isFocused }: any) => {
            return {
                ...styles,
                backgroundColor:
                    isSelected && !isFocused
                        ? null
                        : isFocused && !isSelected
                            ? styles.backgroundColor
                            : isFocused && isSelected
                                ? "#DEEBFF"
                                : null,
                color: isSelected ? null : null,

            };
        },
        menu: (def: any) => ({ ...def, zIndex: 9999 }),

        placeholder: (base) => ({
            ...base,
            fontSize: '0.7em',
            paddingLeft: 4,
            color: '#053B7A',
            fontWeight: 400,
        }),
    };


    if (props.isSelectAll && props.options.length !== 0) {
        isAllSelected.current =
            JSON.stringify(filteredSelectedOptions) ===
            JSON.stringify(filteredOptions);

        if (filteredSelectedOptions?.length > 0) {
            if (filteredSelectedOptions?.length === filteredOptions?.length)
                selectAllLabel.current = `(${filteredOptions.length}) נבחרו`;
            else
                selectAllLabel.current = `${filteredOptions.length} / ${filteredSelectedOptions?.length} נבחרו`;
        } else selectAllLabel.current = "בחר הכל";

        allOption.label = selectAllLabel.current;

        return (
            <>
                <ReactSelect
                    {...props}
                    inputValue={selectInput}
                    onInputChange={onInputChange}
                    onKeyDown={onKeyDown}
                    options={[allOption, ...props.options]}
                    onChange={handleChange}
                    placeholder={'בחרו מיקום'}
                    components={{
                        Option: Option,
                        Input: Input,
                        ...props.components,
                        DropdownIndicator,
                    }}
                    filterOption={customFilterOption}
                    menuPlacement={props.menuPlacement ?? "auto"}
                    styles={customStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    tabSelectsValue={false}
                    backspaceRemovesValue={false}
                    hideSelectedOptions={false}
                    blurInputOnSelect={false}
                />

            </>
        );
    }


    const Placeholder = (props: PlaceholderProps<any>) => {
        useEffect(() => {
            setLoading(false);
        }, []);
        return <>
            {loading ? (<LinearProgress />) : (
                <components.Placeholder {...props} />
            )}
        </>;
    };



    return (
        <>
            {loading ? (<LinearProgress />) : (
                <ReactSelect
                    {...props}
                    inputValue={selectInput}
                    onInputChange={onInputChange}
                    filterOption={customFilterOption}
                    components={{
                        Input: Input,
                        ...props.components,
                        Placeholder
                    }}
                    menuPlacement={props.menuPlacement ?? "auto"}
                    onKeyDown={onKeyDown}
                    tabSelectsValue={false}
                    hideSelectedOptions={true}
                    backspaceRemovesValue={false}
                    blurInputOnSelect={true}
                />
            )}
        </>
    );
};

export default MultiSelect;



