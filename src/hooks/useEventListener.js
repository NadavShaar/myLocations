import { useEffect } from "react";

const useEventListener = (eventName, callback, target = document) => {

 	useEffect(() => {
   		target.addEventListener(eventName, callback);

   		return () => target.removeEventListener(eventName, callback);
 	}, [eventName, callback, target]);

};

export default useEventListener;