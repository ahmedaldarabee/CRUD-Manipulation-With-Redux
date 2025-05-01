import { useSelector } from "react-redux";

const withGuard = (Component) => {
    // السبب انو احنا عملناها هيك لانو لو بدك ترجعها بالصيغة التالية رح يعتبرها خطأ ولاكن احنا حطيناها بداخل دالة لحتى يعتبرها ك
    // ك مكون وبقدر يستقبل معلمات وغيرها من امور
    // الصيغة لي انا بقصدها
    // return <Component />

    // in summary- this way that used to have ability to access this components!
    const WrapperComponent = (props) => {
        console.log('The props that be exist on the withGuard component: ',props);
        const { isLoggedIn } = useSelector((state) => state.auth);

        // {...props} -> 
        // also we can add another props like: age={25}
        return isLoggedIn ? <Component {...props}/> : <p className="text-center">Please <b>log-in</b> to show this page! </p>
    }

    return WrapperComponent;
}

export default withGuard