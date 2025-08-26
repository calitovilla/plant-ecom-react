
interface FormInputProps {
    label: string; 
    [key: string]: string | number | boolean | React.ChangeEventHandler<HTMLInputElement> | undefined;

    // [key: string]: string | number | boolean is not an array it is a `index signature`
    // It allows the object to have properties with names that are not known in advance
    // This object is like a dictionary where each word (key string) points to a value that can only be a string, number, or boolean.
}

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
    return (
        <div>
            <label>{label}</label>
            <input {...otherProps} />
        </div>
    );
};

export default FormInput;
