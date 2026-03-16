import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

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
  <div className="bg-white rounded-xl shadow p-4">
    <h2 className="text-lg font-bold mb-4">Live Containers</h2>

    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th>ID</th>
          <th>Route</th>
          <th>Temp</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {containers.map((c) => (
          <tr key={c.id} className="border-b">
            <td>{c.id}</td>
            <td>{c.route}</td>
            <td>{c.temperature}°C</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
