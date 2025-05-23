import { useState } from 'react'
import css from "./App.module.css";
import type { Votes, VoteType } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App() {
  const [votes, setVotes] = useState<Votes>(
    {
      good: 0,
      neutral: 0,
      bad: 0
    }    
  )

  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1
    })
  }

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }

  const totalVotes: number = votes.good + votes.neutral + votes.bad;
  const positiveRate: number = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes ? true : false} />

        {totalVotes ? (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/>) : (<Notification />) }
      </div>
    </>
  )
}

