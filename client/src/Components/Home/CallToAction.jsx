import React from 'react'

const CallToAction = () => {
  return (
    <div
      id="cta"
      className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28"
    >
      <div className="flex flex-col text-center md:text-left items-start justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Lowongan Pekerjaan
        </h2>

        <div className="flex flex-col gap-4 w-full">

          {/* Job 1 */}
          <a
            href="https://web3.career/engineering-manager-staking-bitgo/141264"
            target="_blank"
            className="border border-slate-200 hover:border-slate-300 p-5 rounded-lg transition bg-white hover:bg-slate-50 w-full"
          >
            <h3 className="text-lg font-medium text-slate-900">
              Engineering Manager - Staking  $220k - $290k
            </h3>
            <p className="text-sm text-slate-600">PT Teknologi Maju</p>
            <p className="text-xs text-blue-600 mt-1">Lihat di JobStreet →</p>
          </a>

          {/* Job 2 */}
          <a
            href="https://web3.career/blockchain-developer-techwish/141514"
            target="_blank"
            className="border border-slate-200 hover:border-slate-300 p-5 rounded-lg transition bg-white hover:bg-slate-50 w-full"
          >
            <h3 className="text-lg font-medium text-slate-900">
              Blockchain Developer $134k - $144k
            </h3>
            <p className="text-sm text-slate-600">Web3 Career Platform</p>
            <p className="text-xs text-blue-600 mt-1">Lihat di Web3 →</p>
          </a>

        </div>

      </div>
    </div>
  )
}

export default CallToAction
