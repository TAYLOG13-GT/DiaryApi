
import React, { useState, useEffect } from "react";
import { Grid, Button, CircularProgress, Typography, Paper } from "@mui/material"
import apiService from "./apiService";

const GridComponent = () => {
    const [loading, setLoading] = useState(false);
    let items;

    useEffect(() => {
        
      fetchData();
    }, []);


    async function fetchData() {
        try {
            setLoading(true);
            const data = await apiService.getItems();

            items = data.Data.map(function(data) {
                return data.UserName;
            });

            console.log(items);

            setLoading(false);

         

        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            {loading ? (<CircularProgress style={{ marginTop: "20px" }} />)
                : (
                    <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
                        <Grid container spacing={2} style={{ fontWeight: "bold", backgroundColor: "#0d47a1", color: "white", padding: "10px", borderRadius: "5px" }}>
                            {items.map((item, i) => (
                                <Grid key={i} item xs={12}>
                                    <Typography> {item}</Typography>
                                    {console.log({ item })}
                                </Grid>
                            ))}
                        </Grid>

                        {/* Data Rows */}
                        {/*{items.map((item) => (*/}
                        {/*    <Paper key={item.id} elevation={3} style={{ marginTop: "10px", padding: "10px" }}>*/}
                        {/*        <Grid container spacing={2} alignItems="center">*/}
                        {/*            <Grid item xs={2}>*/}
                        {/*                <Typography>{item.id}</Typography>*/}
                        {/*            </Grid>*/}
                        {/*            <Grid item xs={10}>*/}
                        {/*                <Typography>{item.title}</Typography>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid>*/}
                        {/*    </Paper>*/}
                        {/*))}*/}
                    </div>
                )}
        </div>
    );
};

export default GridComponent;