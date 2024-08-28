import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useActivity } from "../hooks/useActivity"


export default function ActivityList() {

    const {state, dispatch, emptyActivities, categoryName} = useActivity()
 
  
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

      { emptyActivities ? <p className="text-center my-5">No hay actividades aún...</p> :

      state.activities.map(activity => (
        <div key={activity.id} className="px5 py-10 bg-slate-700 mt-5 flex justify-between shadow-2xl shadow-slate-700 rounded-lg">
            <div className="space-y-2 relative">
                <p className={`absolute -top-8 -left-6 px-10 py-2 text-shadow-md text-white   uppercase font-bold ${activity.category === 2 ? 'bg-lime-500' : 'bg-rose-600'}`}>{categoryName(activity.category)}</p>
                <p className="text-2xl font-bold pt-5 ml-4 text-white text-shadow-lg">{activity.name}</p>
                <p className={`font-black ml-4 text-shadow-lg ${activity.category === 2 ? 'text-lime-500 text-4xl ' : 'text-rose-600 text-4xl'} `}>{activity.category ===1 ? '+' : '-'}{activity.calories}{' '}
                    <span>Calorías</span>
                </p>
            </div>

            <div className="flex gap-5 items-center mr-20">
                <button
                    onClick={() => dispatch({type: 'set-activeId', payLoad: {id: activity.id}})}
                >
                    <PencilSquareIcon 
                        className="h8 w-8 text-white"
                    />

                </button>

                <button
                    onClick={() => dispatch({type: 'delete-activity', payLoad: {id: activity.id}})}
                >
                    <XCircleIcon 
                        className="h8 w-8 text-rose-700"
                    />

                </button>
                
            </div>

        </div>
      ))}
    </>
  )
}
