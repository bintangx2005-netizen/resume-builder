{/* Projects */}
{data.project && data.project.length > 0 && (
    <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROJECTS
        </h2>

        <div className="space-y-4">
            {data.project.map((proj, index) => (
                <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-start mb-2">
                        
                        {/* Left Side */}
                        <div>
                            <h3 className="font-semibold text-gray-900">{proj.name}</h3>

                            {/* Project Type */}
                            {proj.type && (
                                <p className="text-gray-700 font-medium text-sm">
                                    {proj.type}
                                </p>
                            )}

                            {/* Description */}
                            {proj.description && (
                                <p className="text-gray-700 mt-1">{proj.description}</p>
                            )}
                        </div>

                        {/* Right Side - Date */}
                        <div className="text-right text-sm text-gray-600">
                            <p>
                                {formatDate(proj.start_date)} –{" "}
                                {proj.is_current ? "Present" : formatDate(proj.end_date)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
)}
