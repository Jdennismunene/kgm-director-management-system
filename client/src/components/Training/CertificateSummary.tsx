import { Award, ArrowRight, CheckCircle2 } from "lucide-react";

function CertificateSummary() {
  const certificatesIssued = 31;

  return (
    <section className="mb-6">
      <div className="overflow-hidden rounded-xl bg-linear-to-r from-[#5F4A8B] to-[#765FA3] p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <Award size={25} className="text-white" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-lg font-semibold text-white">
                Training Certificates
              </h2>

              <p className="mt-1 text-sm text-purple-100">
                Certificates issued to successfully completed trainees
              </p>

              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 size={17} className="text-purple-100" />

                <span className="text-sm text-white">
                  <span className="font-bold">{certificatesIssued}</span>{" "}
                  certificates issued
                </span>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-[#5F4A8B] transition hover:bg-purple-50 lg:shrink-0"
          >
            View Certificates
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CertificateSummary;
