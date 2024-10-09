export default function Page({params}) {
    return (
        <div>Welcome to Module {params.module[0]} {params.module[1]} {params.module[2]}</div>
    );
}