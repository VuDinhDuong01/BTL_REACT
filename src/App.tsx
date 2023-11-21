import './App.css'
import ControllerInput from './components/controller-form/controller-input'
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'
import { route } from './hooks/useRoutes'
import { useForm, type Control, type FieldValues } from 'react-hook-form'
function App() {
  const { control, register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      name: ""
    }
  })

  return (
    <div className=''>
      {/* {route()} */}
      <Input className='w-[300px]' type='password' />
      <Button size="lg" className='text-[white] outline-none border-none bg-[green] font-[600] text-[16px]'>Xin chào</Button>
      <ControllerInput
        name='name'
        control={control as unknown as Control<FieldValues>}
        label="xin chào "
        required
        className='!text-[30px]'
      />
    </div>
  )
}

export default App
