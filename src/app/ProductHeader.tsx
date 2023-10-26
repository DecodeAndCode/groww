import React from "react";
import {Typography} from "@mui/material";

export function ProductHeader({AssetType, Symbol, Name, Exchange, AnalystTargetPrice, ProfitMargin}) {
    return <div style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: 30
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: 15
        }}>
            <img
                src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAABOFBMVEXu7u7///9Rjvj8Px0otEb7uwDh5e8/hfnr6+v4+Pjx8O5Ch/fB0O9NjPj8uAB6o/Tt9PX9LgD08PTl5eb8Ngv7wAD02J8asj/8OhXv5N2s1af1rKHx1c7t8vr1rZ34hW/4loL5xFTm6d+My40XsTHyyMH7ZVP7Uzfx0MX3jn78RBP7VTDw3tf9HQD5gGH6Zkn7TCf8Lh/w5tD3zHL6vx/20IP4xkn6vzhnmPNYkPLx4sPz3rLF0ej3y2ZswnLV5NJbvWGJqeecz5hDuVXH3sKBxn/zvq33oY76cFf6Xzz8aQD7jRD8nQ37qQn7Xxr7eBHyza2zxe27w1yEtjRRtT6guOjUuBiztyeVtytxtjnjuQ6ltyvAuCAlqV9LkOFUmc5En6dBp4pFrm9OltlUncRAo5Y7qXlPobU5dXSMAAAHrklEQVRogcWb+UPaSBTHgyaYRKEkYAMsog1BrQW11t1q6wJVFNrtHt1td7tH9z7+//9gJ8dkjsyRA8r7pa1YPvN9782bl8mMUspuhmEqulKv13VF0cEfim4qhpHji5SsXEX3kUrS9HrmEWSAGwbgsrCIDyzLAFLDQ8lyA7+VGp8SnpIc8xcHN8TOZvJTyZfDDZ7oWmT58TI4C12rma1Bp3/X/cS3u35n0GKNASRfMXjC4YB72N3dPziyMDs62N/t9lsmPQBZ7IUf07JryuFsDrCNZnOdsGazAYYwnx0qJF8iXgQnZddqhw+PhhaFJYZgDY8eHpIBEIrnf2bUCXRrdjps8MHQGsOj7oDA1/niuXBCdq2z2xRpJvU3dzs4Xjezwil0I4VoTH6DwmeCGxi71tqzMqEDvLXXwvCcvGPCCXb3yMqK9s1qdKV0Fhxj1wYvc6ED/CMs85h0BtzE2N20acaypoWJZ6VdEo7YtdZxbtmR+GMUeQY9AUc+r3UOCrJ913cEnqfhGLtfxOWRNa07QdwVLrs7LIxet07J+W4I4Yg9K+xyP+Q6tdCI4Ii9twD2cKbQpvPhaIotQHeTqDLQTB48DjiY3sXZp31Wg0WEHYfDNbTWL55r1ssWu7mrs+GxzzvFdQ93OX0lMBY8dnrrUar53Ywt+ZHFCnfS8QgeBzxFTW1a1vrB/vx4d/d4vn+wbpHlqLl+x2fjGR/DYeciT7amtX4y6wftcmCtQX92so74jYOOiI21dfAvsdMHEnZjOL9r0V06GMHdPGrxrDkn1ZKOh/DY6eKAW36Hwvzumt/xgIEP9yRoBTleIYWLnU41Rwm+jxeGm5KukMJbom7Nmg8k31zrHKZgK3C6KaTwh3zhoFyaqb44hUXSFaK+CMpL41ScwxkNg0fCd568esxz+YkshzOZjuDwR2fa9hdsunW8QHJgMTwWXtW2X38ctg7hMN1cDdj2l0fJeJ8smh2mnIK8vnO/GtCrX1Gub562Fg4P/K4g4TvnWmjbX5P0xkLzPDJfOgY/q2qQ/hqni9bHwnAo/NMYDgKP6Z4vrLaQdByunGsaRo8D3xgshR3CjegfyOth2kWBt1KsUvnM8OGhctzrIT6sN9YyMt033YfDfzzQKAvqTWNpwsFkU2DD7J7TcL/ePB4uS7gfdAXm27NqAu7Xm/3lCQfwKN+i8kZb9RsJvJzHIrgRw5+w2Nq5K2ab9zay24uocBgK3AVJ5Ftgn+3I4JW1rFa5R1ct8ynT6/eXAb+I9JrwWeGMKbz6TMzOBV+7LIfS492AM2a+nZ8tA14pQ79H05w10zTtqWxNyQXfvDIjdAi3nzPhD+xVwiX5lhO+BeHRssKuMZ8vFQ4Tjg2vPlkO/A2ZSiuCr8Ltb6DbV5pwYriEvZiptqIiExm7ti+7vMKFJdlFaR9tYVnFkopsJc1E0TYqO3wTtVGGsMpUn4vXNdDDbXJtgwOHNcYQts4A/q1kUb3a4tvVBRsO8w317YyHBmDfeTK/C8xlSq9cRvNbFz0uadXzt6rTk/UT/HG92xTnm+BBUat+rwKTSeebzmRjIec+IgP2Dz47v3SO8LUNWN8M3uYAsPdqaN44F90ssydh5TJi67xtERDuHyO26ozyCX/B8fo7Ap7cENKqP6nIvHYO6eYWZ5ZDr1O7UfFWWJRqsTnZHc9zOijsULjB2gQE7J9VyrJmvKlfcOCof2Ntf/qVhWY7k6zwe+yAA9OR8MTGLwj3W5oNwp4t6XjJhi0qOmPLm0w1jH67EPbaWhnzOr3ZX/2FyQb0iZsy60yd73NSOPWa4+w9hw3irqbLebN8wdddqePCqRc8ds/h0lWnrUjxprlV4bcXqMDgL3hi6a4ADtJOJt4u813uV1adEE6/1LPbnoDueD1R5G239+FXAXxjixSeeJ1p34i0h3gm3wZoz3G83zhlFV/IqdeZ6EWu0PEBftIGfJsE22574gX/0/t9k1dZ4RNK4kVuHHWx4wO8o06up65r2qG57vR64v80yow/Lpl07Km8RMOR40cS7QHfU28mo9Ht7Wg0uVE9B/8v3p+swMdTnPXyHnP8jRQOhxBY8uc3fyXolYuE05kHNuyxzPHSUXl/02mHHg6ZBzbQURV7WpSuev+QabdxFe/7ldjw2PHypJPT/73EXB/PcP4hHXQ8yb4uTv+AAo9vP5V4cHQwS1jk05mjwnoTl3ThwSycXly76v0X0Dd4bP5hvAXEHdQbsMSheMsO4+H0qVfY9d6Hi8oVly06gGmPxYtMKvqkzGcLj57aeopKKzRnhJruNEdPiUO3dptRPdOjHexZJ92hW+K4se3eeHnZ3g3WeaQ9bkwetM4rnpCd4aA1RXd72fGOQzRcWY6Yl8jD9fb4NhvecW6JVjPb4foSea3AzoQP0LhsPoP3AXWhwnav1TRFB7Q412SHm+dCBSXelz/tOZ7IAX5z1ZuSvWXOqySlxCUa0CyOr0d+x5YYgeODR9djqq3lZVoaePL6EPhud9y+9ZtGzEAzedse++0s+duFrg8lxUcOMF13PG1HNh2HbTT9e4UvTpX4t9Xs2JgfL+LKmAgvsEVdlgt/bWXXBANb4QXJAL+6q6FwAFwHLPdSLD4C6jqwku868P/Ruv6p5GC+aQAAAABJRU5ErkJggg=="}
                width={80}
                height={80}
                style={{
                    marginRight: 20
                }}
            />
            <div>
                <div>
                    <Typography variant={"h6"}>{Name}</Typography>
                    {Symbol},
                    {AssetType}
                </div>
                <div>
                    {Exchange}
                </div>
            </div>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: 15
        }}>
            <div style={{
                fontWeight: "bold"
            }}>
                {"$" + AnalystTargetPrice}
            </div>
            <div style={{
                color: "green",
                fontWeight: "bold"
            }}>
                {"+" + ProfitMargin + "%"}
            </div>
        </div>
    </div>
}