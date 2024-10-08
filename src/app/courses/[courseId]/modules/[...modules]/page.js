export default function Page({params}) {
    return (
        <div>Welcome to Module {params.modules[0]} {params.modules[1]} {params.modules[2]}</div>
    );
}