

const Loading = () => {
    return (
        <div className="bg-[#ffffff] fixed top-0 left-0 w-[100vw] h-[100vh] z-[2000000] flex items-center justify-center gap-4">
            <span className="bg-rose-600 w-6 h-6 rounded-[50%] animate-[loading_1s_linear_infinite]"></span>
            <span className="bg-indigo-500 w-6 h-6 rounded-[50%] animate-[loading_1s_linear_infinite]"></span>
            <span className="bg-emerald-400 w-6 h-6 rounded-[50%] animate-[loading_1s_linear_infinite]"></span>
        </div>
    );
};

export default Loading;