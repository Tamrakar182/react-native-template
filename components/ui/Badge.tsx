import { View, Text } from 'react-native'
import clsx from 'clsx'

const Badge = ({ status }: { status: string }) => {
    return (
        <View
            className={clsx("rounded-full py-1 px-3", {
                "bg-green-500": status === "verified",
                "bg-yellow-500": status === "on-hold",
                "bg-blue-500": status === "requested"
            })}
        >
            <Text className="text-white text-[12px] capitalize font-sbold">
                {status.replace("-", " ")}
            </Text>
        </View >

    )
}

export default Badge