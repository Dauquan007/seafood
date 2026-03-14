import { supabase } from "../lib/supabase"
import mockData from "../mockData.json"

export default function ContainerPanel(){
const [containers,setContainers] = useState<any[]>([])

useEffect(()=>{

async function loadContainers(){
const {data,error} = await supabase
.from("containers")
.select("*")

if(data){
setContainers(data)
}

}

loadContainers()

},[])

 return (
  <div className="card">
   <h3 className="text-lg font-bold mb-4">
    Cold Chain Containers
   </h3>

   <div className="space-y-3">

   {mockData.containers.map(container => (

    <div
     key={container.id}
     className="flex justify-between bg-slate-800 p-3 rounded-lg"
    >

     <div>
      <p className="font-medium">{container.id}</p>
      <p className="text-xs text-slate-400">
       {container.route}
      </p>
     </div>

     <div className="text-right">
      <p className="font-bold">
       {container.temperature}°C
      </p>
      <p className="text-xs">
       {container.status}
      </p>
     </div>

    </div>

   ))}

   </div>
  </div>
 )
}
