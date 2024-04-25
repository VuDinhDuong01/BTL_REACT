/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";


  export function StatisticsCard({ color, icon, title, value, footer }:{color:any,icon:any,title:any, value:any,footer:any}) {
    return (
      <Card className="border border-blue-gray-100 shadow-sm ">
        <CardHeader
          variant="gradient"
          color={color}
          floated={false}
          shadow={false}
          className="absolute grid h-12 w-12 place-items-center"
        >
          {icon}
        </CardHeader>
        <CardBody className="p-4 text-right font-fontFamily">
          <Typography variant="small" className="font-normal text-blue-gray-600 text-[18px] font-fontFamily font-[600]">
            {title}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {value}
          </Typography>
        </CardBody>
        {footer && (
          <CardFooter className="border-t border-blue-gray-50 p-4">
            {footer}
          </CardFooter>
        )}
      </Card>
    );
  }
  

  
  export default StatisticsCard;
  