import React, { Suspense } from 'react';
import { useChain } from '../../wallet/WalletContext';
import CreateLotteryBinance from './CreateLotteryBinance';
import CreateLotterySolana from './CreateLotterySolana';

function CreateLottery() {

    const { chainId } = useChain();

    console.log({ chainId });

    if (chainId === "97") {
        return (
            <CreateLotteryBinance />
        )
    }

    return (
        <Suspense fallback="Loading...">
            <CreateLotterySolana />
        </Suspense>
    )

}

export default CreateLottery;