using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nozama.OrderService.Migrations
{
    /// <inheritdoc />
    public partial class Cascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderLine_Orders_OrderId",
                table: "OrderLine");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderLine_Orders_OrderId",
                table: "OrderLine",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderLine_Orders_OrderId",
                table: "OrderLine");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderLine_Orders_OrderId",
                table: "OrderLine",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");
        }
    }
}
