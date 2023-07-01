import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"; // TODO
import {
    Box, LinearProgress, Stack, Typography, useTheme
} from "@mui/material";
import { useEffect, useState, useRef, useContext } from "react";
import { default as ReactSelect, components, InputAction, PlaceholderProps, DropdownIndicatorProps } from "react-select";
import { ColorModeContext } from "../../../theme";


export type Option = {
    value: number | string;
    label: string;
};

const MultiSelect = (props: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const colorMode = useContext(ColorModeContext);

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
        <Box sx={{
            borderBottom:
                colorMode?.getActualMode()! === 'light'
                    ? '1px solid #CCCCCC'
                    : colorMode?.getActualMode()! === 'dark-contrast'  // dark
                        ? '1px solid #505050'
                        : '1px solid #CCCCCC'
        }}>
            <components.Option {...props}>
                <Stack direction='row' margin={0.5} spacing={1}>
                    {props.value === "*" &&
                        !isAllSelected.current &&
                        filteredSelectedOptions?.length > 0 ? (
                        <input
                            key={props.value}
                            type="checkbox"
                            ref={(input) => {
                                if (input) input.indeterminate = true;
                            }}
                        />
                    ) : (
                        <input
                            key={props.value}
                            type="checkbox"
                            checked={props.isSelected || isAllSelected.current}
                            onChange={() => { }}
                        />
                    )}
                    <Box sx={{
                        fontFamily: 'Rubik',
                        fontSize: '15px',
                        letterSpacing: '0px',
                        color: colorMode?.getActualMode()! === 'light' ? '#6E6E6E' : null,
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
                <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
                    {props.children}
                </components.Input>
            )}
        </>
    );

    const DropdownIndicator = (
        props: DropdownIndicatorProps<any, true>
    ) => {
        const { selectProps } = props;
        return (
            <>
                {selectProps.menuIsOpen ? (
                    <components.DropdownIndicator {...props}>
                        <KeyboardArrowUp fontSize='small' sx={{
                            color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                            '&:hover': { cursor: 'pointer' }
                        }} />
                    </components.DropdownIndicator>
                )
                    : (
                        <components.DropdownIndicator {...props}>
                            <KeyboardArrowDown fontSize='small' sx={{
                                color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                '&:hover': { cursor: 'pointer' }
                            }} />
                        </components.DropdownIndicator>
                    )}
            </>

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

    const msgStyles = {
        backgroundColor:
            colorMode?.getActualMode()! === 'light'
                ? '#EDEDED'
                : colorMode?.getActualMode()! === 'bright-contrast'
                    ? '#f7f7f7'
                    : colorMode?.getActualMode()! === 'dark-contrast'
                        ? '#2d2d2d'
                        : '#EDEDED', // black & white mode
        fontSize: 'small',
    };

    const NoOptionsMessage = props => {
        return (
            <components.NoOptionsMessage {...props}>
                <span>אין תוצאות</span>
            </components.NoOptionsMessage>
        );
    };


    const customStyles = {
        input: (base: any) => ({
            ...base,
            paddingLeft: 4,
            fontSize: 'medium',
            color:
                colorMode.getActualMode()! === 'light'
                    ? '#053B7A'
                    : colorMode.getActualMode()! === 'dark-contrast'
                        ? '#b2d0ec'
                        : colorMode.getActualMode()! === 'bright-contrast'
                            ? '#6e86a2'
                            : '#000000', // black & white mode
        }),
        noOptionsMessage: (base: any) => ({ ...base, ...msgStyles }),
        indicatorSeparator: (baseStyles: any) => ({
            ...baseStyles,
            alignSelf: 'stretch',
            backgroundColor:
                colorMode?.getActualMode()! === 'light'
                    ? 'hsl(0, 0%, 85%)'
                    : colorMode?.getActualMode()! === 'bright-contrast'
                        ? 'hsl(0, 0%, 85%)'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#424242'
                            : 'hsl(0, 0%, 85%)', // black & white mode
            marginBottom: 8,
            marginTop: 8,
            width: 1,
            borderRadius: 1,
        }),
        control: (baseStyles: any) => ({
            ...baseStyles,
            border: 0,
            boxShadow: 'none',

            backgroundColor:
                colorMode?.getActualMode()! === 'light'
                    ? '#EDEDED'
                    : colorMode?.getActualMode()! === 'bright-contrast'
                        ? '#EDEDED'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#2d2d2d'
                            : '#EDEDED', // black & white mode
            '&:hover': { cursor: !open && 'pointer' },
        }),

        multiValueLabel: (def: any) => ({
            ...def,
            backgroundColor:
                colorMode?.getActualMode()! === 'light'
                    ? '#053B7A'
                    : colorMode?.getActualMode()! === 'bright-contrast'
                        ? '#6e86a2'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#b2d0ec'
                            : '#000000' // black & white mode

            ,
            color:
                colorMode?.getActualMode()! === 'light'
                    ? '#FFFFFF' :
                    colorMode?.getActualMode()! === 'bright-contrast'
                        ? '#FFFFFF'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#2d2d2d'
                            : '#FFFFFF',
            borderRadius: 0,
            fontSize: 'small',

        }),
        multiValueRemove: (def: any) => ({
            ...def,
            backgroundColor:
                colorMode?.getActualMode()! === 'light'
                    ? '#053B7A'
                    : colorMode?.getActualMode()! === 'bright-contrast'
                        ? '#6e86a2'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#b2d0ec'
                            : '#000000', // black & white mode

            color:
                colorMode?.getActualMode()! === 'light'
                    ? '#FFFFFF'
                    : colorMode?.getActualMode()! === 'bright-contrast'
                        ? '#FFFFFF'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#000000'
                            : '#FFFFFF', // black & white mode

            borderRadius: 0,
            paddingLeft: 2,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor:
                    colorMode?.getActualMode()! === 'light' ? '#053B7A' : colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : "#b2d0ec",
            }
        }),
        valueContainer: (base: any) => ({
            ...base,
            minHeight: "38px",
            overflow: 'visible',
        }),
        option: (styles: any, { isSelected, isFocused }: any) => {
            return {
                ...styles,

                color:
                    colorMode?.getActualMode()! === 'light'
                        ? (isSelected ? null : null)
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? (isFocused ? '#000000' : '#FFFFFF')
                            : colorMode?.getActualMode()! === 'bright-contrast'
                                ? (isSelected ? null : null)
                                : (isSelected ? null : null), // black & white mode
                backgroundColor:

                    isSelected && !isFocused
                        ? colorMode?.getActualMode()! === 'light'
                            ? '#FFFFFF'
                            : colorMode?.getActualMode()! === 'dark-contrast'
                                ? '#2d2d2d'
                                : colorMode?.getActualMode()! === 'bright-contrast'
                                    ? '#FFFFFF'
                                    : '#FFFFFF' // black & white mode

                        : isFocused && !isSelected // hover
                            ? colorMode?.getActualMode()! === 'light'
                                ? '#DEEBFF'
                                : colorMode?.getActualMode()! === 'dark-contrast'
                                    ? '#DEEBFF'
                                    : colorMode?.getActualMode()! === 'bright-contrast'
                                        ? '#DEEBFF'
                                        : '#ededed' // black & white mode
                            : isFocused && isSelected
                                ? colorMode?.getActualMode()! === 'light'
                                    ? "#DEEBFF"
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? "#DEEBFF"
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? "#DEEBFF"
                                            : "#ededed" // black & white mode
                                : colorMode?.getActualMode()! === 'light'
                                    ? '#FFFFFF'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#2d2d2d'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#FFFFFF'
                                            : '#FFFFFF',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: 'DEEBFF'
                },
            };
        },
        menu: (def: any) => ({
            ...def,
            zIndex: 9999,
            backgroundColor:
                colorMode.getActualMode()! === 'light'
                    ? null
                    : colorMode.getActualMode()! === 'bright-contrast'
                        ? null
                        : colorMode.getActualMode()! === 'dark-contrast'
                            ? '#2d2d2d'
                            : null // black & white mode
        }),

        placeholder: (base: any) => ({
            ...base,
            fontSize: 'medium',
            paddingLeft: 4,
            color:
                colorMode.getActualMode()! === 'light'
                    ? '#053B7A'
                    : colorMode.getActualMode()! === 'dark-contrast'
                        ? '#b2d0ec'
                        : colorMode.getActualMode()! === 'bright-contrast'
                            ? '#6e86a2'
                            : '#000000', // black & white mode
            fontWeight: 400,
            position: 'absolute'
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
                    placeholder={open ? 'חיפוש..' : 'בחרו מיקום'}
                    components={{
                        Option: Option,
                        Input: Input,
                        ...props.components,
                        DropdownIndicator,
                        NoOptionsMessage,
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
                    onMenuOpen={() => setOpen(true)}
                    onMenuClose={() => setOpen(false)}
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



