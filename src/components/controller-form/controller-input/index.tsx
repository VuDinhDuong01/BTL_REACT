import { forwardRef, type Ref, type ComponentPropsWithRef, useId } from 'react'
import { Controller, type FieldValues, type Path, Control } from 'react-hook-form'
import { Label } from '../../ui/Lable'
import { Input } from '../../ui/Input'


interface ControlerInputProp<TFieldValues extends FieldValues = FieldValues> extends ComponentPropsWithRef<'input'> {
    name: Path<TFieldValues>,
    control: Control<TFieldValues>
    id?: string
    className?: string,
    required?: boolean,
    label?: string,
    placeholder?: string
    type?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    classNameLabel?:string 
}

const ControllerInput = forwardRef<Ref<HTMLInputElement>, ControlerInputProp>(({ name,classNameLabel, control, label, type, placeholder, required, onChange, className, ...props }, ref) => {
    const id = useId()
    return <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <div className='flex flex-col'>
                <Label className={classNameLabel as string + " !text-[17px] mb-[2px] font-fontFamily cursor-pointer"} htmlFor={id} >{label}{required && <span className='text-[red]'>*</span>}</Label>
                <Input id={id} placeholder={placeholder}
                    {...field}
                    type={type}
                    className={className}
                    {...props}
                    ref={ref as Ref<HTMLInputElement>}
                    onChange={(e) => {
                        field.onChange(e)
                        if (onChange) onChange(e)
                    }}
                />
            </div>
        )}
    />
})
export default ControllerInput
