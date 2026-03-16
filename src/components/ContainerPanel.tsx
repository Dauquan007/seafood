import React, { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function ContainerPanel(){
const [containers,setContainers] = useState<any[]>([])

useEffect(()=>{


loadContainers()

const channel = supabase
  .channel("containers-realtime")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "containers"
    },
    (payload) => {
      fetchContainers()
    }
  )
  .subscribe()

return () => {
  supabase.removeChannel(channel)
}
}, [])

async function loadContainers(){
const {data,error} = await supabase
.from("containers")
.select("*")

if(data){
setContainers(data)
}

}
return (
  <div className="card mt-6">
  <h3 className="font-bold mb-4">Containers Tracking</h3>

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
       {containers.map((container) => (
  <div key={container.id} className="card">
    <h3>{container.id}</h3>
    <p>Route: {container.route}</p>
    <p>Temperature: {container.temperature}°C</p>
    <p>Status: {container.status}</p>
  </div>
        ))}
      </tbody>
    </table>
  </div>
  
)
}


